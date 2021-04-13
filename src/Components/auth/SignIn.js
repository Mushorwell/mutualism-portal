import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {authentication} from '../../firebase/firebase';
import Loader from 'react-loader-spinner';
import Popup from 'reactjs-popup';

const SignIn = (props)=>{
    // sign in form input states
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    // form validation states
    const [formErr, setFormErr] = useState("");
    // login
    const login = (e)=>{
        // prevent the form from reloading the page
        e.preventDefault();
        authentication.signInWithEmailAndPassword(email,password)
        .then((user)=>{
            // get user state
            if(user.user.emailVerified){
                props.updateAuthState(true);
            }else{
                // authentication.currentUser.sendEmailVerification();
                setFormErr("Please verify your email, before signing in.")
            }

        })
        .catch((err)=>{
            setFormErr(err.message);
        })
    }

    // Popup for visual feedback on invalid login input
    const modal = ()=>{
        if(email == "" || password == ""){
            return (
                <div class="alert alert-danger" role="alert">
                    Please fill in all the required fields
                </div>
            )
        }
        else {
            return <Loader type="Grid" color="#212529" height={100} width={100}/>
        }
    }

    return(
        <>
            <h1 className="heading">Sign in to continue.</h1>
            <form onSubmit={login} method="post">
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input value={email} onChange={(val)=>{setEmail(val.target.value)}} type="email" placeholder={"Email address*"} className="form-control sign-in-element" id="inputEmail"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input value={password} onChange={(val)=>{setPassword(val.target.value)}} type="password" placeholder={"Password*"} className="form-control sign-in-element" id="inputPassword3"/>
                    </div>
                </div>
                <div className="row mb-3 prompts">
                    <div className="col sign-up-prompt">
                        Can't sign in?
                    </div>
                    <div className="col password-reset-prompt">
                        <Link to={"passwordReset"}>Forgot Password</Link>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <Popup modal onClose={()=>setFormErr("")} trigger={<button type="submit" className="form-control sign-in-element submit-button">Sign in</button>} position="right center">
                            {formErr != ""?<div class="alert alert-danger" role="alert">{formErr}</div>:modal}
                        </Popup>
                    </div>
                </div>
            </form>
            <div className="row mb-3 ">
                <div className="col-sm-12 sign-up-element">
                    Not registered? <a href="http://www.mutualism.co.za" target="_blank"><span className="create-account">Get in touch</span></a>
                </div>
            </div>
        </>
    )
}
export default SignIn