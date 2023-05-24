import React, { useState } from 'react'

import NoteContext from './NotesContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const s1 = {
        "name": "saad",
        "class": "5A"
    }

    // Updation of states ---- the perfect way
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Ahmad",
                "class": "10A"
            })
        }, 2000);
    }
    // --------------------------------------------------------------------------------------------------
    const notesOfSecretPasswordUser = []
    const [notes, setNotes] = useState(notesOfSecretPasswordUser)

    // Get Notes
    const getNotes = async () => {
        // TODO API
        const response = await fetch(`${host}/notes/fetchData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
             }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)

    }

    // Add a Note
    const addNote = async (Title, Description, tag) => {
        // TODO API
        const response = await fetch(`${host}/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ Title, Description, tag }),
        });
        const json = await response.json();
        console.log(json)

        // Logic to Add Notes in Client
        const note = json
        if (note.Title.length > 3) {
            setNotes(notes.concat(note))
        }
        else {
            console.log('Error Occured')
        }
    }
    // Delete a Note 
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)

        // Logic to delete Notes in Client
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a Note
    const editNote = async (id, Title, Description, tag) => {
        // TODO API
        const response = await fetch(`${host}/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ Title, Description, tag }),
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit Notes in Client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].Title = Title
                newNotes[index].Description = Description
                newNotes[index].tag = tag
                break
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState