import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props
    const clickDeleteHandle = (id) => {       
        deleteNote(id)
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title" >{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i><p className="card-text">{note.tags}</p></i>
                    <i className="mx-1 fa-solid fa-trash" onClick={() => { clickDeleteHandle(note._id); props.showAlert('Deleted succesfully','success') }}></i>
                    <i className="mx-1 fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem