import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log("Database connected");
})

const app = express();

app.use(cors());
app.use(json());

app.use('/api/auth', router);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})