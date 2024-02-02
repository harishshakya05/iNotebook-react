import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:5000';
export const Login = (props) => {   
    const history = useNavigate();
    const [credential,setcredential] = useState({ email:"", password:""});   
    const onChangeHandle = (e) => {        
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    const onSubmitHandle = async (e) => {
        e.preventDefault();        
        const response = await fetch(`${url}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",                
            },
            body: JSON.stringify({ email:credential.email, password:credential.password}),
        })
        const res = await response.json();
        if(res.status){           
            localStorage.setItem('token',res.token)           
            history('/')
            props.showAlert('Login success','success');    
        }else{
            props.showAlert('invalid credentials','danger');            
        }
        console.log(res);
    }
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={onSubmitHandle}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} aria-describedby="emailHelp" required onChange={onChangeHandle} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} required onChange={onChangeHandle} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
