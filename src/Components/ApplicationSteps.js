import React,{useState} from 'react';
import Popup from "reactjs-popup";
const ApplicationSteps = (props)=>{

    return(
        <div id="steps">
            <div className={props.activeStep == 1? "step first-step active-step":"step first-step"}>
                <div className={props.activeStep == 1? "active":"inactiveStep"}>1</div>
                <p>Basic Business Info</p>
            </div>
            <div className={props.activeStep == 2? "step second-step active-step":"step second-step"}>
                <div className={props.activeStep == 2? "active":"inactiveStep"}>2</div>
                <p>Technical Info</p>
            </div>
            <div className={props.activeStep == 3? "step third-step active-step":"step third-step"}>
                <div className={props.activeStep == 3? "active":"inactiveStep"}>3</div>
                <p>Project scope</p>
            </div>
        </div>
    )
}
export default ApplicationSteps