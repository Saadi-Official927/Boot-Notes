import React, { useState, useContext } from 'react'
import noteContext from '../Context/Notes/NotesContext'
import Alert from './Alert'

function AddNotes(props) {
    const noteFetching = useContext(noteContext)
    const { addNote } = noteFetching
    const [note, setNote] = useState({ Title: '', Description: '', tag: '' })
    const [showAlert, setShowAlert] = useState(null);


    const alert = (type, message) => {
        if (note.Title.length <= 3) {
            setShowAlert({
                type: type,
                message: message
            });
            setTimeout(() => {
                setShowAlert(null);
            }, 5000);
        }
    }
    const addNoteClick = (e) => {
        e.preventDefault()
        addNote(note.Title, note.Description, note.tag)
        alert('Error', 'Follow the Instructions')
        setNote({ Title: '', Description: '', tag: '' })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        // minLength={5} required   ===> it will work only on  onSubmit button in form, but we used onClick function and handled by JS 
        <>
            <Alert alert={showAlert} />
            <h1 data-aos='fade-in' className='text-center  text-3xl font-bold'>Add a Note</h1>
            <form className='container mx-auto grid grid-cols-6 gap-4' >
                <div className="col-start-3 col-span-3 flex flex-col my-3" data-aos='slide-right'>
                    <label htmlFor="Title" className="form-label text-2xl my-1 ">Title</label>
                    <input type="text" className={` form-control ${note.Title.length <= 4 ? "focus:border-pink-500 focus:ring-2 focus:ring-pink-200" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-200"} bg-white rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `} id="Title" name='Title' aria-describedby="emailHelp" placeholder={'Title'} onChange={onChange} value={note.Title} />
                    <small htmlFor="Title" className="form-label">{note.Title.length <= 4 ? "Please Enter atleast 5 charachters" : ""}</small>
                </div>
                <div className="col-start-3 col-span-3 flex flex-col mb-3" data-aos='slide-right'>
                    <label htmlFor="Description" className={`form-label text-2xl my-1 `}>Note Description</label>
                    <input type="text" className={` form-control ${note.Description.length <= 9 ? "focus:border-pink-500 focus:ring-2 focus:ring-pink-200" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-200"} bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} id="Description" name='Description' placeholder={'Description'} onChange={onChange} value={note.Description} />
                    <small htmlFor="Description" className="form-label">{note.Description.length <= 9 ? "Please Enter atleast 10 charachters" : ""}</small>
                </div>
                <div className="col-start-3 col-span-3 flex flex-col mb-3" data-aos='slide-right'>
                    <label htmlFor="tag" className="form-label text-2xl my-1 ">Note Tags</label>
                    <input type="text" className={` form-control ${note.tag.split(/\s/).filter((element) => { return element.length != 0 }).length <= 2 ? "focus:border-pink-500 focus:ring-2 focus:ring-pink-200" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-200"} bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} id="tag" name='tag' placeholder={'Tags'} onChange={onChange} value={note.tag} />
                    <small htmlFor="tag" className="form-label">
                        {note.tag.split(/\s/).filter((element) => { return element.length != 0 }).length <= 2 ? "Please Enter atleast 3 Words" : ""}
                    </small>
                </div>
                <div className="col-start-3">
                    <button data-aos='fade-out' onClick={addNoteClick} className='text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg'>Add a Note</button>
                </div>
            </form>

        </>
    )
}

export default AddNotes