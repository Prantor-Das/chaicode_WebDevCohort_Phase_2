import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// mongoose.connect(url);

//exports a function that connects to db
const db = () => {
    mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to mongodb");
    })
    .catch((error)=>{
        console.log("Error connecting to mongodb");
    });
}

export default db;