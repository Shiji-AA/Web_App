import jwt from "jsonwebtoken";
import User from "../src/Model/userModel.js";



export const isLogin =async(req,res,next)=>{
    try{
       const authorizationHeader=req.headers.authorization;     
      //console.log( authorizationHeader," authorizationHeader");
       if(!authorizationHeader){
        return res.status(401).json({error:"unauthorized"})
       }
          const token=authorizationHeader.split(' ')[1];
          //console.log(token,"token");
          if(!token){
             return res.status(401).json({error:"unauthorized"})
          }

          const decoded =jwt.verify(token,process.env.JWT_SECRET);
             //console.log(decoded ,"decoded token");

          const user=await User.findById(decoded.user_id)  ;
          console.log(user,"user")
          
          if(!user){
             return res.status(401).json({error:"unauthorized"}) 
          }
          req.user=user;
          next(); 
       
    }
    catch(error){
        console.error("Error in middleware",error)
        return res.status(500).json({error:"internal server error"})
    }




}