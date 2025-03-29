// const login = async (require, response) => {
//     response.send("registered");
// };

//functionality

import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const registerUser = async (req, res) => {
    //get data
    //validate
    //check if user already exists 
    //create a user in database
    //create a verification token
    //save token in database
    //send token as email to user
    //semd a success status to user

    //get data
    const {name, email, password} = req.body
    //validate
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    //check if user already exists 
    //there is a chance for error so try catch
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        
        //create a user in database
        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user);
        

        if(!user){
            return res.status(400).json({
                message: "User not registered"
            })
        }

        //create a verification token
        //there is a module in node known as crypto which is used to generate crypto(gibberish(random bytes))

        const token = crypto.randomBytes(32).toString("hex") //bytes generate in hex format
        console.log(token);
        

        //save token in database
        user.verificationToken = token
        await user.save()

        //send token as email to user
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.MAILTRAP_SENDERMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/verify/${token}
            `, // plain text body

            // html: "<b>Hello world?</b>", // html body
        };
        
        
        await transporter.sendMail(mailOption)

        //semd a success status to user
        res.status(201).json({
            message: "User registered successfully",
            success: true
        })


    } catch (error) {
        res.status(400).json({
            message: "User not registered ",
            error,
            success: false
        })
    }
    
};

const verifyUser = async (req, res) => {
    //get token from url
    //validate
    //find user based on token
    //if not
    //if found, then set isVerifield = true
    //remove verification token
    //save
    //return response

    //get token from url
    const {token} = req.params;
    console.log(token);

    //validate
    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    //find user based on token
    const user = await User.findOne({verificationToken: token})
    //becase the name of the varriable is different from the schema, 
    // it was not the case in email as the name in both the field are same

    //if not
    if(!user){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    //if found, then set isVerifield = true
    user.isVerified = true;

    //remove verification token
    user.verificationToken = undefined;

    //save
    await user.save(); //jab save kar rahe hai tab dusre continent

}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password",
            });
        } //email hai ya nahi hai

        //if email hai
        const isMatch = await bcrypt.compare(password, user.password);
        //password is user password and user.password is the password in the database

        console.log(isMatch);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        //user verified, if not give message "Please verify your email"
        if (!user.isVerified) {  // Check from the database, not req.body
            return res.status(400).json({
                message: "Please verify your email",
            });
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},

            process.env.JWT_SECRET,
            {
                expiresIn: '24h' //expire in 24 hours,it should go in env variable but as of now it is in ('shhhhh'is the token)
            }

        );  //mongodb have _id, it does not require await

        const cookieOptions = {
            httpOnly: true, //cookie backend k control mein a gayi, normaal user cher char nahi kar sakti
            secure: true,
            maxAge: 24*60*60*1000 //for 24 hours
        };

        res.cookie("test", token, cookieOptions)
        // key value pair mein cookie ati hai
        //res.cookie("test", token, {}), here {} is the options we can also give option s like expires in few hours, etc. Alag se bhi bana sakte hai
        //es.cookie("test", token) if we do not want to pass options

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.roll
            }
        })

    } catch (error) {
        res.status(400).json({
            message: "Invalid email or password",
            error,
            success: false
        })
    }

}

const getMe = async (req, res) => {     //khud ki profile lena 
    try {
        // const data = req.user;
        // console.log("reached at profile level", data);

        const user = await User.findById(req.user.id).select('-password');

        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        console.log("Error in get me")
    }
}

const logoutUser = async (req, res) => {
    try {
        //clear the cookies to logout


        // res.cookie('token', '', {
        //     expires: new Date(0), //immediate cookie clear
        // })  //we can also pass objects

        res.cookie('token','',{});
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        })
    } catch (error) {
        
    }
}

const forgotPassword = async (req, res) => {
    try {
        //get email (from req.body)
        //find user based on email
        //reset token + reset expiry => Date.now() + 10 * 60 * 60 * 1000 => user.save()
        //send mail => design url
    } catch (error) {
        
    }
}

const resetPassword = async (req, res) => {
    try {
        //collect token from params
        //password from req.body
        //find user
        const {token} =req.params;
        const {password, confPassword} = req.body;

        if(password === confPassword){

        }

        try {
            //collect user
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: {$gt: Date.now()} //$gt greater than eise lower than bhi hota hai
            })
            //set password in user
            user.password = password;
            //resetToken, resetExpire => reset Khali karna hai)
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            //undefined database se hata deta hai and null se field rahega toh database jada consume although having no data
            //save
            await user.save;
        } catch (error) {
            
        }
        
    } catch (error) {
        
    }
}

export {registerUser, verifyUser, login, getMe, logoutUser, resetPassword, forgotPassword}
