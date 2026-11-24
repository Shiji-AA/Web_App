import express from "express"
import { addNotes, chatbot, deleteNote, getNotes, getNotesById, loginUser, registerUser, updateNote } from "../Controllers/userController.js"
import { isLogin } from "../../middleware/userAuth.js";
const router= express.Router()


router.post('/register',registerUser );
router.post('/login',loginUser )

router.post('/notes',isLogin,addNotes );

router.get('/notes',  isLogin,  getNotes );

router.get('/notes/:id',getNotesById);
router.put('/notes/:id',updateNote);
router.delete('/notes/:id',deleteNote);
router.post('/chat',chatbot )
export default router

