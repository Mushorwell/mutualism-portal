import React, {useState} from 'react';
import Loader from 'react-loader-spinner';
import Popup from 'reactjs-popup';
import {authentication} from '../../firebase/firebase';
import SignUp from './SignUp';
const PasswordReset = (props)=>{
    // form input states
    const [email,setEmail] = useState("");

    // form validation  states
    const [resetErr,setResetErr] = useState("");
    const [resetCompleted,setResetCompleted] = useState(false);

    // method to reset the password
    const resetPassword = (e)=>{
        e.preventDefault();
        if(email != ""){
            authentication.sendPasswordResetEmail(email)
            .then(()=>{
                setResetCompleted(true);
            })
            .catch((err)=>{
                setResetErr(err.message);
            })
        }
    }

    // form validation method with visual user feedback
    const modal = ()=>{
        if(email == ""){
            return <p>Please fill in all the required fields</p>
        }else if(resetErr != ""){
            return <p style={{color:'#D90E31'}}>{resetErr}</p>;
        }
        else {
            return <Loader type="Grid" color="#212529" height={100} width={100}/>
        }
    }

    // reset form when modal is closed
    const resetForm = ()=>{
        if(resetCompleted == true){
            setEmail("");
            setResetCompleted(false);
        }else{
            setResetCompleted(false);
            setResetErr("");
        }
    }

    return(
        <>
            <h1 className="heading">Reset password.</h1>
            <form onSubmit={resetPassword} method="post">
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input type="email" value={email} onChange={(val)=>{setEmail(val.target.value)}} placeholder={"Email address*"} className="form-control sign-in-element" id="inputEmail"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <Popup modal onClose={resetForm} trigger={<button type="submit" className="form-control sign-in-element submit-button">Reset password</button>} position="right center">
                            {resetCompleted == true?<p>Successful. Please check your inbox for further instructions.</p>: modal}
                        </Popup>
                    </div>
                </div>
            </form>
        </>
    )
}
export default PasswordReset