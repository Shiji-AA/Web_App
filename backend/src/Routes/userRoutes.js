import express from "express"
import { addNotes, deleteNote, getNotes, getNotesById, loginUser, registerUser, updateNote } from "../Controllers/userController.js"
const router= express.Router()


router.post('/register',registerUser );
router.post('/login',loginUser )
router.post('/notes',addNotes );
router.get('/notes',getNotes );
router.get('/notes/:id',getNotesById);
router.put('/notes/:id',updateNote);
router.delete('/notes/:id',deleteNote);
export default router

