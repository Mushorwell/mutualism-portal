import React, {useState} from 'react';
import Loader from 'react-loader-spinner';
import Popup from 'reactjs-popup';
import {authentication} from '../../firebase/firebase';
import ReCAPTCHA from "react-google-recaptcha";
const SignUp = (props)=>{
    // Declaring the different states for the register page
    // Form input
    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [mobile,setMobile] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // Form validation
    const [signUpErr,setSignUpErr] = useState("");
    const [formValid, setFormValid] = useState(false);
    // Response check
    const [signUpCompleted,setSignUpCompleted] = useState(false);

    // create user account
    const register = (e)=>{
        e.preventDefault();
        // Form validation for no input
        if(email != "" || password != "" || name != "" || lastName != "" || mobile != "" ){
            // check if form is valid/recaptcha has been completed
            if(formValid == true){
                // create firebase account
               var register =  authentication.createUserWithEmailAndPassword(email,password)
               register.then((userCredential)=>{
                    authentication.currentUser.sendEmailVerification();  
                    // save user details in database
                    fetch('https://mutualism-test.herokuapp.com/api/createUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body:"name="+name+"&email="+email+"&last_name="+lastName+"&mobile="+mobile+"&userId="+userCredential.user.uid,
                    })
                    .then((re)=>re.json())
                    .then((re)=>{
                        setSignUpCompleted(true); 
                    })
                })
                .catch((err)=>{
                    setSignUpErr(err.message);
                })
            }else{
                setSignUpErr("Please complete the ReCAPTCHA.");
            }
        }
    }

    // pop up
    const modal = ()=>{
        // Notification for invalid registration form
        if(email == "" || password == "" || name == "" || lastName == "" || mobile == "" ){
            return <div class="alert alert-danger" role="alert">Please fill in all the required fields</div>;
        }
        else if(signUpErr != ""){
            return <div class="alert alert-danger" role="alert">{signUpErr}</div>
        }
        else {
            return <Loader type="Grid" color="#212529" height={100} width={100}/>
        }
    }

    // update recaptcha
    const onRecaptchaChange = (value)=>{
        if(value == "" || value == null){
            setFormValid(false);
        }else{
            setFormValid(true);
        }
    }

    // reset form when modal is closed
    const resetForm = ()=>{
        if(signUpCompleted == true){
            setName("");
            setMobile("");
            setLastName("");
            setEmail("");
            setPassword("");
        }else{
            setSignUpErr("");
            setSignUpCompleted(false);
        }
    }

    return(
        <>
            <h1 className="heading">Sign up.</h1>
            <form onSubmit={register}>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input type="text" value={name} onChange={(val)=>{setName(val.target.value)}} placeholder={"First name*"} className="form-control sign-in-element" id="inputName"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input type="text" value={lastName} onChange={(val)=>{setLastName(val.target.value)}} placeholder={"Last name*"} className="form-control sign-in-element" id="inputSurname"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input type="text" value={mobile} onChange={(val)=>{setMobile(val.target.value)}} placeholder={"Mobile number*"} className="form-control sign-in-element" id="inputMobile"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input type="text" value={email} onChange={(val)=>{setEmail(val.target.value)}} placeholder={"Email address*"} className="form-control sign-in-element" id="inputEmail"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <input type="password" value={password} onChange={(val)=>{setPassword(val.target.value)}} placeholder={"Password*"} className="form-control sign-in-element" id="inputPassword3"/>
                    </div>
                </div>

                <div className="recaptcha">
                    <ReCAPTCHA
                        sitekey="6LdSVlEaAAAAAGHJ-lrPRKC411-z5rXbdlbMVdWN"
                        onChange={onRecaptchaChange}
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-sm-12">
                        <Popup modal onClose={resetForm} trigger={<button type="submit" className="form-control sign-in-element submit-button">Sign up</button>} position="right center">
                            {signUpCompleted == true? <div class="alert alert-success" role="alert">Sign up successful, please check your inbox to verify your email address.</div>: modal}
                        </Popup>
                    </div>
                </div>
            </form>

        </>
    )
}
export default SignUp