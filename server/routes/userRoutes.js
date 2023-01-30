import { Router } from "express";
import { getAllUsers, login, register, setAvatar } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get('/allUsers/:id', getAllUsers);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/setAvatar/:id', setAvatar);

export default userRouter;