import { Router } from "express";
import { getUserInfo, login, signup, updateProfile, logOut } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { sendQuery } from "../controllers/queryController.js";
import { getCropByName } from "../controllers/Pesticide.js";
const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/query",sendQuery);
authRoutes.get("/getcrop/:name",getCropByName);
authRoutes.post("/logout", logOut)

export default authRoutes;
