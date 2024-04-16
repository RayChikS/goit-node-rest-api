import express from "express";

import validateBody from "../middlewares/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrent,
} from "../controllers/usersControllers.js";
import authenticate from "../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

authRouter.post("/login", validateBody(loginUserSchema), loginUser);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.get("/current", authenticate, getCurrent);

export default authRouter;
