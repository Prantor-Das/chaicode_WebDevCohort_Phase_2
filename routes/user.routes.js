import express from "express";

import { login, registerUser, verifyUser, getMe, logoutUser } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.get("/register", registerUser);
router.post("/register", registerUser);
//usually jab data bhejte hai post is preferred
//data bhejne k liye body->raw->json-> in format
// {
//     "name":"hitesh",
//     "email":"one@one.com",
//     "password":"123456"
// }

router.get("/verify/:token",verifyUser);
//:token is variable name although looking like string
//user se data lene ka koi jhamela nahi hai, tai get

router.post("/login", login);
//post because data lege user se

router.get("/profile", isLoggedIn, getMe); //isLoggedIn is middleware, pass reference not isLoggedIn() {This is event driven architecture}

router.get("/logout", isLoggedIn, logoutUser);


export default router;
