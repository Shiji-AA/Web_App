import mongoose from 'mongoose';
import User from '../Model/userModel.js'

const notesSchema = new mongoose.Schema({
userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",      
        required: true,
    },
title:{
    type:String,
    required:true,
    },
content:{
    type:String,
    required:true,
    },
 
},{
    timestamps:true
})

const Notes=mongoose.model('Notes',notesSchema);
export default Notes;