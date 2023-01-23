import { Router } from "express";
import { register } from "../controllers/usersController.js";

const router = Router();

router.post('/register', register)

export default router;