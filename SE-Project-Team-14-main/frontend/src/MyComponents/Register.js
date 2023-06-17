import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";


export default function Register() {

    let history = useHistory();
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [cpasswordReg, setCpasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [errmsg, seterrmsg] = useState("");


    const register = (e) => {
        if(usernameReg === "" || emailReg === ""||passwordReg === ""){
            seterrmsg("All fields are required!");
        }else if(passwordReg.length < 6){
            seterrmsg("Password must be atleast 6 characters");
        }
        else{
            Axios.post("http://localhost:5000/register", {
                username: usernameReg,
                email: emailReg,
                password: passwordReg,
                cpassword: cpasswordReg
                
            })
            .then((res)=>{
                console.log(res);
                if(res.data.auth){
                    localStorage.setItem("token", res.data.token);
                    history.push('/');
                    window.location.reload();
                }else{
                    seterrmsg(res.data.msg);
                }
            }) 

        }
        
        e.preventDefault();       
    };

    return (
        <div className="text-center container w-25 rounded bg-dark">
            <div className="form-signin my-5 p-3">
                <form onSubmit={register}>
                    <h1 className="h3 mb-5 pt-3 fw-normal text-white">Register</h1>
                    <div className="form-floating">
                        <input 
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        onChange={(e)=> {
                            setEmailReg(e.target.value);
                        }}
                        placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input 
                        type="username" 
                        className="form-control" 
                        id="floatingInput" 
                        onChange={(e)=> {
                            setUsernameReg(e.target.value);
                        }}
                        placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword"
                        onChange={(e)=> {
                            setPasswordReg(e.target.value);
                        }} 
                        placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword"
                        onChange={(e)=> {
                            setCpasswordReg(e.target.value);
                        }} 
                        placeholder="Password" />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    { errmsg !== "" ? <div class="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> {errmsg} </div> : <></> }
                    <button className="w-50 mt-4 mb-2 btn btn-primary" type="submit">Sign up</button>
                   
                    <div className="row container">
                        <div className="col-8 text-white text-end mt-2 mb-3">Already a user? </div>
                        <div className="col-4 mt-2 text-start"><Link to="/login" className="text-white">Login</Link></div>
                        <br />
                    </div>
                </form>
            </div>
        </div>
    );
}
