// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";

// app.use("/") matches all routes starting with
//  / so if placed before specific routes, it catches requests before they reach userRoutes, overriding them

//import all routes
import userRoutes from "./routes/user.routes.js"

dotenv.config();

const app = express();

app.use(      //making the cors file
    cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], //not case sensitive
    allowedHeaders: ['Content-Type', 'Authorization'] //case sensitive
})
);
app.use(express.json()) //accept json files
app.use(express.urlencoded({extended:true})) //encoding the url. 
// There are many encodings so extended is made true to do all types of encoding including modern encodings

const port = process.env.PORT || 4000;  //good practice either process.env.PORT(3000) or port 4000

app.get("/", (req, res) => { //request accept(send a request body with GET) ____ '/' route
  res.send('Cohort!');
}); //it runs on request

app.get("/hitesh", (req, res) => {
    res.send('Hitesh');
  });

app.get("/piyush", (request, response) => {
    response.send("Piyush!")
});

// "/piyush" is the path, (request, response) => {
//    response.send("Piyush!") is the callback function

// console.log(process.env.PORT)

//connect to db
db();

//user routes
app.use("/api/v1/users", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});