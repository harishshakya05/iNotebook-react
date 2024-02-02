import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const history = useNavigate()
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }else{
            history('/login')
        }
       
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags })
    }
    const onChangeHandle = (e) => {       
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const clickHandle = (e) => {
        e.preventDefault();
        refclose.current.click();        
        editNote(note.id, note.etitle, note.edescription, note.etags)
        props.showAlert('Updated succesfully','success') 
    }
    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='container my-3'>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Note Title</label>
                                <input type="text" className="form-control" placeholder="Enter Title minimun of 5 character" id="etitle" name="etitle" value={note.etitle} minLength={5} required aria-describedby="emailHelp" onChange={onChangeHandle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Note Description</label>
                                <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={onChangeHandle}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etags" className="form-label">Note Tags</label>
                                <input type="text" className="form-control" id="etags" name="etags" value={note.etags} placeholder="Enter tags" onChange={onChangeHandle} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={clickHandle}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Notes</h1>
            <h3>{(notes.length===0)?'No Notes Found':''}</h3>
            <div className='row my-3'>
                {notes.map((noteItem) => {
                    return <Noteitem key={noteItem._id} updateNote={updateNote} note={noteItem} showAlert={props.showAlert}/>
                })}

            </div>
        </>
    )
}

export default Notes