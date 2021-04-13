import React, {useState} from 'react';
import Select from 'react-select';
import {BsInfoCircleFill} from "react-icons/bs";
import PopupInfo from "../step1/PopupInfo";
import Popup from "reactjs-popup";

const BusinessDescription = (props) => {
    // const [summary, setSummary] = useState('');
    const handleChange = (event) => {
        props.setSummary( event.target.value);
        // localStorage.setItem('businessDescription', props.summary);
    }
    // console.log(localStorage.getItem('businessDescription'));
    return(
        <div className="input-section" style={props.show?{width:"100%"}:{display:"none"}}>
            <h5 className="step-heading">
                Tell us about your business
            </h5>
            {/*<Popup className="my-popup-content" trigger={<span style={{marginLeft:5}}><BsInfoCircleFill className="infoBtn"/></span>} position="top"><PopupInfo info={"locations"}/></Popup>*/}
            <p>In no more than 3 sentences, tell us what you do.</p>
            <div className="location-input-container">
                <textarea 
                    name="summary" 
                    id="summary" 
                    placeholder="My business is..." 
                    className="description-input" 
                    rows="4" 
                    cols="50"
                    maxLength={200}
                    minLength={75}
                    value={props.summary}
                    onChange={handleChange}
                    required={true}
                />
                <p className="errorMessage" style={props.errors.businessDescriptionNoText?null:{display:"none"}}>
                    {props.errors.businessDescriptionNoText}<BsInfoCircleFill className="infoBtn"/>
                </p>
                <p className="errorMessage" style={props.errors.businessDescriptionTextTooShort?null:{display:"none"}}>
                    {props.errors.businessDescriptionTextTooShort}<BsInfoCircleFill className="infoBtn"/>
                </p>
                <span
                    style={
                        (props.summary.length>=75)&&(props.summary.length<=200) ?
                            {marginBottom: "50px", color: "#007A4D"} :
                            {marginBottom: "50px", color: "red"}
                    }
                >
                    {props.summary.trim().length}/200
                </span>
            </div>
            <br/>
        </div>
    );
}

export default BusinessDescription;