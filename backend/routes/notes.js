const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
// 1. Get all notes using : GET "/api/notes/getnotes". Login required
router.get("/getnotes", fetchuser, async (req, res) => {

    try {
        const id = req.user;
        const notes = await Notes.find({ user: id });
        res.send(notes);
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})

// 2. create notes using : POST "/api/notes/createnote". Login required
router.post("/createnote", fetchuser, [
    body('title', 'enter valid title').trim().isLength({ min: 3 }),
    body('description', 'enter valid description').trim().isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    const { title, description, tags } = req.body;
    try {
        const note = new Notes({
            title, description, tags, user: req.user
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        return res.status(500).json({ error: "some error occured" })
    }
})

// 3. Update notes using : put "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tags } = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tags) {
            newNote.tags = tags
        }
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json("not found")
        }
        if (note.user.toString() != req.user) {
            return res.status(401).json("not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        return res.status(500).json({ error: "some error occured 111" })
    }
})


// 4. Delete a note using : DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {    
    try {        
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json("not found")
        }
        if (note.user.toString() != req.user) {
            return res.status(401).json("not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json(note);
    } catch (error) {
        return res.status(500).json({ error: "some error occured" })
    }
})

module.exports = router;