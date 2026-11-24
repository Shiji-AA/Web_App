
import User from "../Model/userModel.js";
import Notes from "../Model/notesModel.js";
import generateToken from "../Utils/generateToken.js";
import bcrypt from "bcryptjs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


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



const addNotes = async (req, res) => {
  const { title, content } = req.body;
  try {
    const user=req.user;
console.log(user,"user")
    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }
    const newNote = new Notes({
      title,
      content,
      userId: req.user._id, 
    });
    await newNote.save();
    res.status(201).json({ message: "note added successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};



const getNotes=async(req,res)=>{
try{
const user=req.user;
const notes = await Notes.find({ userId: user._id }).exec();

res.status(200).json({notes})
}
catch(error){
res.status(500).json({message:"Error in fetching data"})
}
}


const getNotesById=async(req,res)=>{
try{
const Id=req.params.id
const notes=await Notes.findById(Id).exec()
res.status(200).json({notes})
}
catch(error){
res.status(500).json({message:"Error in fetching data"})
}
}


const updateNote=async(req,res)=>{
    try{
        const Id=req.params.id        
          const {title,content } = req.body;  
          const note = await Notes.findById(Id);  
            if (!note) {
      return res.status(404).json({ error: "Invalid id" });
    }
    
    note.title =title || Notes.title;
    note.content=content || Notes.content;
    await note.save();

    return res.status(200).json({message:"note updated successfully"}) 


    }
    catch(error){
        console.log(error)
         return res.status(500).json({message:"an error occurred"}) 
    }
}

const deleteNote=async(req,res)=>{
    try{
        const Id= req.params.id;
        const deletedItem= await Notes.findByIdAndDelete(Id);
        if(deletedItem){
            res.status(200).json({message:"note deleted successfully"})
        }
        else{
            res.status(400).json({message:"note not found"})
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}




const chatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim() || message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid message",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message.trim(),
      config: {
        systemInstruction:
          "You are a helpful AI chatbot. " +
          "Answer questions in simple English.",
        maxOutputTokens: 500,
      },
    });

    console.log(response,"response")

    res.status(200).json({
      success: true,
      reply: response.text || "No response generated",
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};



export { registerUser ,loginUser,addNotes,getNotes,getNotesById,updateNote,deleteNote,chatbot};