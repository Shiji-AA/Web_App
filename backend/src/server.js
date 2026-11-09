import express from "express"
const app= express()
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from "./Routes/userRoutes.js" ;
import { connectDB } from './config/db.js';
connectDB()

app.use(express.json());

const port=process.env.PORT;
app.use("/api/users",userRoutes);
app.get("/",(req,res)=>res.send("server is ready"))

app.listen(port,()=>console.log("server started "))