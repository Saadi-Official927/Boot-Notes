import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/Notes/NotesContext'


function TestingContext() {
  const abc = useContext(noteContext)

  useEffect(() => {
    abc.update()
  }, [])

  return (
    <div>name {abc.state.name} and class {abc.state.class}</div>

  )
}

export default TestingContext