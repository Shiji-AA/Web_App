
import User from "../Model/userModel.js";
import generateToken from "../Utils/generateToken.js";
import bcrypt from "bcryptjs";


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
               res.json({ user,message: "User Registered successfully" });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




// const loginUser = (req, res) => {
//   res.status(200).json({ message: "loginUser" });
// };

const loginUser=async(req,res)=>{
    try{
        const{email, password}=req.body;
        const user=await User.findOne({email});
        
        if(!user){
            return res.status(401).json({message:"invalid user"})
        }



        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
               return res.status(401).json({message:"invalid user"})
        }
        const token=generateToken(user._id);
        
        res.status(200).json({
            message:"login successful",
            token,
            user:{
                id:user._id,
                name:user.name            }
        })
       }
    catch(error){ 
        console.log(error) ;
        res.status(500).json({
            message:"server error"
        })}}


export { registerUser ,loginUser};