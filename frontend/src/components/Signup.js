import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const url = 'http://localhost:5000';
export default function Signup(props) {
    const history = useNavigate()
    const [credential, setcredential] = useState({ name: "", email: "", password: "" })
    const onChangeHandle = (e) => { 
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    const onSubmitHandle = async (e) => {
        e.preventDefault();       
        const response = await fetch(`${url}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
        })
        const res = await response.json()        
        if(res.status){
            history('/')
            props.showAlert('Signup created successfully','success')
        }else{
            props.showAlert('wrong credentials','danger')           
        }
    }
    return (
        <>
            <h2>Signup</h2>
            <form onSubmit={onSubmitHandle}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credential.name} aria-describedby="emailHelp" onChange={onChangeHandle} required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} aria-describedby="emailHelp" onChange={onChangeHandle} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChangeHandle} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
