// const login = async (require, response) => {
//     response.send("registered");
// }

//functionality

import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
    
}


export {registerUser}
