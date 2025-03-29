import mongoose from "mongoose";

//mongoose is orm, it acts as a mediator between backend and mongodb

import dotenv from "dotenv";
dotenv.config();

// export a function that connects to db
//needed to connect to database:- database, ip_whitelisting, username-password
// mongoose.connect(url);

//database is always in another continent, so use try catch, promise, await, async...
const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log("Error connecting to mongodb");
    });
};

export default db;
