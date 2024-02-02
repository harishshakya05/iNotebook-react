import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tags: "" })
    const onChangeHandle = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        props.showAlert('Added succesfully','success') 
        setNote({ title: "", description: "", tags: "" })
    }
    
    return (
        <>
            <h1>Add Note</h1>
            <form className="my-3">
            <div className='container my-3'>
                <div className="mb-3">
                    <label htmlFor="titlte" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="titlte" name="title" value={note.title} placeholder="Enter Title" onChange={onChangeHandle} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note Description</label>
                    <textarea className="form-control" id="description" name="description" value={note.description}  rows="3" onChange={onChangeHandle} required minLength={5}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Note Tags</label>
                    <input type="text" className="form-control" id="tags" name="tags" value={note.tags}  placeholder="Enter tags" onChange={onChangeHandle} required minLength={5}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length <5 || note.tags.length<5}  type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </div>
            </form>
        </>
    )
}

export default Addnote