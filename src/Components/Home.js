import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/Notes/NotesContext'
import Notes from './Notes'

function Home() {

    return (
        <>
            <Notes />
        </>
    )
}

export default Home