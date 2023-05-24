import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/Notes/NotesContext'
import AddNotes from './AddNotes'
import NotesItems from './NotesItems'


function Notes() {
    const noteFetching = useContext(noteContext)
    const { notes, getNotes, editNote } = noteFetching
    let history = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            history("/login")
        }
    }, [])

    const [success, setSuccess] = useState(false)
    const ref = useRef(null)
    const [note, setNote] = useState({ id: "", Title: '', Description: '', tag: 'default' })

    const updateEditNote = (currentNote) => {
        setSuccess(true)
        ref.current.click()
        setNote({ id: currentNote._id, Title: currentNote.Title, Description: currentNote.Description, tag: currentNote.tag })
    }

    const updateNoteClick = (e) => {
        ref.current.click()
        editNote(note.id, note.Title, note.Description, note.tag)
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNotes />
            <button ref={ref} type="button" className="btn btn-primary d-none invisible " data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            {success && <div className={`modal fade`} id="exampleModalCenter" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content my-16">
                        <div className="modal-header">
                            <h5 className="modal-title text-center text-2xl " id="exampleModalLongTitle">Edit Note</h5>
                        </div>
                        <div className="modal-body">
                            <form className='container mx-auto my-3 grid grid-cols-3 gap-5'>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label leading-7 text-sm text-gray-600 ">Title</label>
                                    <input type="text" className={`form-control ${note.Title.length <= 4 ? "focus:border-pink-500 focus:ring-2 focus:ring-pink-200" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-200"} w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} id="Title" name='Title' aria-describedby="emailHelp" value={note.Title} onChange={onChange} />
                                    <small htmlFor="Title" className="form-label">{note.Title.length <= 4 ? "Please Enter atleast 5 charachters" : ""}</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label leading-7 text-sm text-gray-600">Note Description</label>
                                    <input type="text" className={`form-control  ${note.Description.length <= 9 ? "focus:border-pink-500 focus:ring-2 focus:ring-pink-200" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-200"} w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} id="Description" name='Description' value={note.Description} onChange={onChange} />
                                    <small htmlFor="Description" className="form-label">{note.Description.length <= 9 ? "Please Enter atleast 10 charachters" : ""}</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label leading-7 text-sm text-gray-600">Note Tags</label>
                                    <input type="text" className={`form-control   ${note.tag.split(/\s/).filter((element) => { return element.length != 0 }).length <= 2 ? "focus:border-pink-500 focus:ring-2 focus:ring-pink-200" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-200"} w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} id="tag" name='tag' value={note.tag} onChange={onChange} />
                                    <small htmlFor="tag" className="form-label">
                                        {note.tag.split(/\s/).filter((element) => { return element.length != 0 }).length <= 2 ? "Please Enter atleast 3 Words" : ""}
                                    </small>
                                </div>
                            </form>
                        </div>
                        <div className="mx-4 text-center grid ">
                            <button onClick={updateNoteClick} type="button" className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>}




            <h1 className="container text-center mx-auto text-2xl ">Your Notes</h1>
            <h5 className='text-center'>{notes.length === 0 && "No Notes to display "}</h5>
            <div className="flex justify-center md:flex-row flex-col ">
                {notes.map((note) => {
                    return <NotesItems updateEditNote={updateEditNote} note={note}/>
                })}
            </div>
        </>
    )
}

export default Notes