// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js"; //in project setting add '.js' which can cause error sometimes
import cookieParser from "cookie-parser";

// app.use("/") matches all routes starting with
//  / so if placed before specific routes, it catches requests before they reach userRoutes, overriding them

//import all routes
import userRoutes from "./routes/user.routes.js"

dotenv.config(); 
// if in other file other than root file than define it in the config file(./foldername/filename)

const app = express();

app.use(      //making the cors file
    cors({
    origin: process.env.BASE_URL, //multiple origin can be added by placing it in array with comma
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], //not case sensitive, which all methods are allowd
    allowedHeaders: ['Content-Type', 'Authorization'] //case sensitive
})
);

app.use(express.json()); //accept json files from frontend and others
app.use(express.urlencoded({extended:true})); //encoding the url. 
// There are many encodings so extended is made true to do all types of encoding including modern encodings
app.use(cookieParser());
//now we can use cookie-parser in req, res...power a agai


const port = process.env.PORT || 4000;  //good practice either process.env.PORT(3000) or port 4000

app.get("/", (req, res) => { //request accept(send a request body with GET) ____ '/' route
  res.send('Cohort!');
}); //it runs on request

app.get("/hitesh", (req, res) => {
    res.send('Hitesh');
  });

app.get("/piyush", (request, response) => {
    response.send("Piyush!") //it is like console.log()
});

// "/piyush" is the route (path), 
// (request, response) => {response.send("Piyush!") is the callback function which is also known as controller

// console.log(process.env.PORT)

//connect to db
db();

//user routes
app.use("/api/v1/users", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});