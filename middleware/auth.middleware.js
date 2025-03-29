import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const isLoggedIn = async (req, res, next) => { // the params are req, res, next, next because beech mein rok rahe hai
    try {
        //token leke au
        //token check karo
        //token mein se data nikalo


        console.log(req.cookies);  //debuggig step
        let token = req.cookies?.token;
        // let token = req.cookies.token || "";

        console.log('Token Found: ', token ? "YES" : "NO");
        if(!token){
            console.log("No Token");
            return res.status(400).json({
                success: false,
                message: "Authentication failed"
            })
        }

        // try {
        //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //     console.log("Decoded data: ", decoded);
        //     req.user = decoded;
    
        //     next()
        // } catch (error) {
            
        // }  one way to do it, some devs do like it

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded data: ", decoded);
        req.user = decoded; //decoded data is object
        //req k andar ek naya user banao or uske andar decoded object dal do

        next(); //age jane k liye //pass on phase
        
        
    } catch (error) {
        console.log("Auth middleware failure");
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        
    }
    // next(); 2 baar response nahi send karna hai
};

//is code se req.user milega