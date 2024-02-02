
import { useState } from "react";
import NoteContext from "./noteContext";
const url = 'http://localhost:5000';

const NoteState = (props) => {
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    // Get All Note
    const getNote = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/notes/getnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'token': token,
            }
        })
        const result = await response.json();
        setNotes(result)
    }

    // Add Note
    const addNote = async (title, description, tags) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': token,
            },
            body: JSON.stringify({ title, description, tags }),
        })
        const note = await response.json();
        setNotes(notes.concat(note));    
         
    }
    // Delete Note
    const deleteNote = async (id) => {
        console.log("deleteing note", id);
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'token': token,
            }
        })
        const result = await response.json();
        console.log(result);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    // Edit Note
    const editNote = async (id, title, description, tags) => {
        console.log("editing a note");
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token,
            },
            body: JSON.stringify({ title, description, tags }),
        })
        const result = await response.json();
        console.log(result);
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tags = tags;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;