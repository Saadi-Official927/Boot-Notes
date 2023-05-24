const express = require('express')
const router = express.Router()
const Note = require('../Models/Notes')
const Middleware = require('../Middleware/GetUserDetails')
const { check, validationResult } = require('express-validator');


// ------------------------------------------------------------------------------------------------------------------------------
// testing
router.get('/', (req, res) => {
    console.log("saad is here")
    res.send("saad is there")
})

// ------------------------------------------------------------------------------------------------------------------------------
// ROUTE 2 Creating and add Notes
router.post('/addnotes', Middleware, [
    check('Title', 'Please! Enter a Valid title').isLength({ min: 4 }),
    check('Description', 'Description atleast 5 characters').isLength({ min: 10 })
], async (req, res) => {

    try {
        const { Title, Description, tag } = req.body

        // errs and sending Bad requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            Title, Description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somehing Happened")
    }

})

// ------------------------------------------------------------------------------------------------------------------------------
// Fetching Data
router.get('/fetchData', Middleware, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somehing Happened")
    }

})

// ------------------------------------------------------------------------------------------------------------------------------
// Updating Data & updating notes
router.put('/updatenotes/:id', Middleware, async (req, res) => {

    try {
        const { Title, Description, tag } = req.body
        const newNote = {}
        if (Title) {
            newNote.Title = Title
        }
        if (Description) {
            newNote.Description = Description
        }
        if (tag) {
            newNote.tag = tag
        }

        // Find the USER NOTE and update it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(400).send("Not Found")
        }

        // Allow user to update his own note if actually belongs to him/her
        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somehing Happened")
    }

})

// ------------------------------------------------------------------------------------------------------------------------------
// Deleting Data & Deleting notes
router.delete('/deletenotes/:id', Middleware, async (req, res) => {

    try {
        // Find the USER NOTE and delete it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(400).send("Not Found")
        }

        // Allow user to delete his own note if actually belongs to him/her
        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success" : "Note has been deleted", note : note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somehing Happened")
    }

})

module.exports = router