import express from "express"
import cors from 'cors'
const app= express()
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from "./Routes/userRoutes.js" ;
import { connectDB } from './config/db.js';
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:4000",
        "https://web-app-y5e7.vercel.app"
    ],
    credentials: true
}));

const port=process.env.PORT;

app.use("/api/users",userRoutes);

app.get("/",(req,res)=>res.send("server is ready"))

app.listen(port,()=>console.log("server started "))