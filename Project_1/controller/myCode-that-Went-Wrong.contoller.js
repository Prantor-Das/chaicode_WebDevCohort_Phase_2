//My way

// //functionality

// import { log } from "console";
// import User from "../model/User.model.js";
// import crypto from "crypto";
// import nodemailer from "nodemailer";


// // const registerUser = async (require, response) => {
// //     // response.send("registered");

// //     //get data
// //     //validate
// //     //check if user already exists 
// //     //create a user in database
// //     //create a verification token
// //     //save token in database
// //     //send token as email to user
// //     //semd a success status to user

// // };


// // Postman collection is different from db collection

// const registerUser = async (req, res) => {
//     //get data
//     //validate
//     const {name, email, password} = req.body
//     if(!name || !email || !password){
//         return res.status(400).json({
//             message: "All fields are required",
//         });
//     }
    
//     //check if user already exists 
//     //there is a chance for error so try catch
//     try {
//         const existingUser = await User.findOne({email})
//         if(existingUser){
//             return res.status(400).json({
//                 message: "User already exists",
//             });

//         }

//         const user = await User.create({
//                 name,
//                 email,
//                 password
//         })
//         console.log(user);

//         if(!user){
//             return res.status(400).json({
//                 message: "User not registered",
//             })
//         }

//         const token = crypto.randomBytes(32).toString("hex");
//         console.log(token);
//         //randomBytes generate text in hex form

//         user.verificationToken = token
//         await user.save()

//         //send email
//         const transporter = nodemailer.createTransport({
//             host: process.env.MAILTRAP_HOST,
//             port: process.env.MAILTRAP_,
//             secure: false, // true for port 465, false for other ports
//             auth: {
//               user: process.env.MAILTRAP_USERNAME,
//               pass: process.env.MAILTRAP_PASSWORD,
//             },
//         });

//         const mailOption = {
//             // // send mail with defined transport object
//             // from: process.env.MAILTRAP_SENDERMAIL, // sender address
//             // to: user.email, // list of receivers
//             // subject: "Verify your email", // Subject line
//             // text: `Please click on the following link:
//             // ${process.env.BASE_URL}/api/vi/user/verify/${token}
//             // `, // plain text body
//             // // html: "<b>Hello world?</b>", // html body

//             from: process.env.MAILTRAP_SENDERMAIL, // Sender address
//             to: user.email, // Recipient email
//             subject: "Verify Your Email", // Email subject
//             text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/user/verify/${token}`, // Plain text body
//             html: `
//                 <div style="font-family: Arial, sans-serif; color: #333;">
//                     <p>Please click on the following link to verify your email:</p>
//                     <p>
//                         <a href="${process.env.BASE_URL}/api/v1/user/verify/${token}" 
//                             style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 15px; 
//                                 text-decoration: none; border-radius: 5px;">
//                                 Verify Your Email
//                         </a>
//                     </p>
//                     <p>If you did not request this, please ignore this email.</p>
//                     <p>Best Regards,</p>
//                     <p>Your Team</p>
//                 </div>
//             `,// HTML body

//         await transporter.sendMail(mailOption);

//         res.status(200).json({
//             message: "User registered successfully",
//             success: true
//         });

//     } catch(error){
//         res.status(400).json({
//             message: "User not registered ",
//             error,
//             success: false
//         });
//     }
    
// };

// const verifyUser = async (req, res) => {
//     //get token from url
//     //validate
//     //find user based on token
//     //if not
//     //if found then isVerified fied to be true
//     //remove verification token
//     //save
//     //return response

//     const {token} = req.params
// }

// export {registerUser, verifyUser}





//GPT

// import User from "../model/User.model.js";
// import crypto from "crypto";
// import nodemailer from "nodemailer";

// const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const user = await User.create({ name, email, password });

//         if (!user) {
//             return res.status(400).json({ message: "User not registered" });
//         }

//         const token = crypto.randomBytes(32).toString("hex");
//         user.verificationToken = token;
//         await user.save();

//         const transporter = nodemailer.createTransport({
//             host: process.env.MAILTRAP_HOST,
//             port: process.env.MAILTRAP_PORT,
//             secure: false,
//             auth: {
//                 user: process.env.MAILTRAP_USERNAME,
//                 pass: process.env.MAILTRAP_PASSWORD,
//             },
//         });

//         const mailOption = {
//             from: process.env.MAILTRAP_SENDERMAIL,
//             to: user.email,
//             subject: "Verify Your Email",
//             text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; color: #333;">
//                     <p>Please click on the following link to verify your email:</p>
//                     <p>
//                         <a href="${process.env.BASE_URL}/api/v1/user/verify/${token}" 
//                             style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 15px; 
//                                 text-decoration: none; border-radius: 5px;">
//                                 Verify Your Email
//                         </a>
//                     </p>
//                     <p>If you did not request this, please ignore this email.</p>
//                     <p>Best Regards,</p>
//                     <p>Your Team</p>
//                 </div>
//             `,
//         };

//         await transporter.sendMail(mailOption);

//         res.status(200).json({ message: "User registered successfully", success: true });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// const verifyUser = async (req, res) => {
//     const { token } = req.params;

//     if (!token) {
//         return res.status(400).json({ message: "Invalid token" });
//     }

//     try {
//         const user = await User.findOne({ verificationToken: token });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid or expired token" });
//         }

//         user.isVerified = true;
//         user.verificationToken = null;
//         await user.save();

//         res.status(200).json({ message: "Email verified successfully", success: true });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// export { registerUser, verifyUser };