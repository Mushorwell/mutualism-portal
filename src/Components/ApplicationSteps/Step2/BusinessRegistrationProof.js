import React, {useState} from "react";
import {BsInfoCircleFill} from "react-icons/bs";

const BusinessRegistrationProof = (props) => {
    // const [cipcReg, setCipcReg] = useState('');
    // const [sarsReg, setSarsReg] = useState('');
    // localStorage.setItem('businessRegistrationProofCipc', props.cipc);
    // console.log(localStorage.getItem('businessRegistrationProofCipc'));
    // localStorage.setItem('businessRegistrationProofSars', props.sars);
    // console.log(localStorage.getItem('businessRegistrationProofSars'));
    return(
        <div className='input-section'>
            <h3 className="step-heading">Registration</h3>
            <div className="application-form inline-input-elements" style={{marginTop:40}}>
                <div><h5 className="step-heading">Please enter your (CIPC) company registration number </h5></div>
            </div>
            <div style={{width:'80%'}}>
                <input
                    type="text"
                    name="cipc-reg"
                    id="cipc-reg"
                    placeholder="CIPC registration number..."
                    className="team-size-input registration-number-input"
                    value={props.cipc}
                    onChange={(event)=>props.setCipc(event.target.value)}
                    required
                />
                <p className="errorMessage" style={props.errors.cipcInputNoText?null:{display:"none"}}>
                    {props.errors.cipcInputNoText}<BsInfoCircleFill className="infoBtn"/>
                </p>
            </div>

            <div className="application-form inline-input-elements" style={{marginTop:40}}>
                <div><h5 className="step-heading">Please enter your (SARS) company tax registration number</h5></div>
            </div>
            <div style={{width:'80%'}}>
                <input
                    type="text"
                    name="sars-reg"
                    id="sars-reg"
                    placeholder="SARS registration number..."
                    className="team-size-input registration-number-input"
                    value={props.sars}
                    onChange={(event)=>props.setSars(event.target.value)}
                    required
                />
                <p className="errorMessage" style={props.errors.sarsInputNoText?null:{display:"none"}}>
                    {props.errors.sarsInputNoText}<BsInfoCircleFill className="infoBtn"/>
                </p>
            </div>

            <br/>
        </div>
    );
}

export default BusinessRegistrationProof;