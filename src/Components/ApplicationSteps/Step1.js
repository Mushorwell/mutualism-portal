import React, {useEffect, useState} from 'react';
import {BsCheck, BsInfoCircleFill,BsChevronLeft,BsChevronRight} from "react-icons/bs";
import Popup from "reactjs-popup";
import PopupInfo from './step1/PopupInfo';
import Slider from '@material-ui/core/Slider';
import BusinessStages from './step1/BusinessStages';
import LocationOptions from './step1/LocationOptions';


const Step1 = (props)=>{

    const [userSelectedLocation,setUserSelectedLocation] = useState(()=>{
        const setLocation = localStorage.getItem('userLocation');
        return setLocation !== null
            ? setLocation
            : 'soweto';
    });
    const [step,setStep] = useState(0);
    const [businessStage,setBusinessStage] = useState(()=>{
        const stageOfBusiness = localStorage.getItem('stageOfBusiness');
        return stageOfBusiness !== null || !isNaN(Number(stageOfBusiness))
            ? Number(stageOfBusiness)
            : 10;
    })
    const [err,setErr] = useState("");
    const [showErr,setShowErr] = useState(false);

    useEffect(()=>{
        localStorage.setItem('userLocation', userSelectedLocation);
        localStorage.setItem('stageOfBusiness', businessStage.toString());
    },[
        userSelectedLocation,
        businessStage
    ])

    const previousStep = ()=>{
        setStep(step-1);
    }

    const nextStep = ()=>{
        // validate location input
        if(step == 2){
            if(userSelectedLocation == ""){
                setShowErr(true);
                setErr("Please enter your location");
            }else{
                setShowErr(false);
                setErr("");
                props.nextStep();
            }
        }else{
            setStep(step+1);
        }
    }

    const valuetext = (value)=> {
        setBusinessStage(value);
        if(value == 10){
            return "Ideation";
        }
        else if(value == 20){
            return "Newly operational";
        }
        else if(value == 30){
            return "Operating";
        }
        else{
            return "Growing";
        }
      }
    


      const marks = [
        {
          value: 10,
          label: 'Ideation',
        },
        {
          value: 20,
          label: 'Newly operational',
        },
        {
          value: 30,
          label: 'Operating',
        },
        {
          value: 40,
          label: 'Growing',
        },
      ];

    return(
        <div className="step1">
            <h1 className="status-heading">Business funding application</h1>
            <p className="status-body business-application-summary-text">
                We bridge the gap in funding opportunities for Township-based South Africans.
            </p>
        {step == 0?
                <div className="applicationInfo">
                    <h5 style={{fontWeight:200}}>Complete the online funding application<br/> in 3 easy steps.</h5>
                    <div className="button-div"><p style={{fontWeight:200,width:'80%'}}>Before you begin, please esnure that your business satisfies the criteria below.</p></div>
                    <div className="required-item">
                        <BsCheck size={30} color={"#007A4D"}/>
                        <p>Your business is registered with CIPC</p>
                        <Popup className="my-popup-content" trigger={<span style={{marginLeft:5}}><BsInfoCircleFill className="infoBtn"/></span>} position="top"><PopupInfo info={"business registration"}/></Popup>
                    </div>
                    <div className="required-item">
                        <BsCheck size={30} color={"#007A4D"}/>
                        <p>Your business is registered tax with SARS</p>
                        <Popup className="my-popup-content" trigger={<span style={{marginLeft:5}}><BsInfoCircleFill className="infoBtn"/></span>} position="top"><PopupInfo info={"sars registration"}/></Popup>
                    </div>
                    <div className="required-item">
                        <BsCheck size={30} color={"#007A4D"}/>
                        <p>Your business must be based in Soweto or Khayelitsha</p>
                        <Popup className="my-popup-content" trigger={<span style={{marginLeft:5}}><BsInfoCircleFill className="infoBtn"/></span>} position="top"><PopupInfo info={"township based"}/></Popup>
                    </div>
                    <div className="button-div">
                        <button className="btn btn-dark application-start" onClick={nextStep}>
                            Start application
                        </button>
                    </div>
                </div>
                :
                null
        }

        {step > 0?
            <>
                <div className="applicationInfo application-form">
                    <h5 className="step-heading">Please drag slider to select stage of your business: </h5>
                    <Slider
                        min={10}
                        max={40}
                        defaultValue={businessStage}
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                    <br/>
                    <BusinessStages stage={businessStage}/>

                    {step > 1?
                        <div className="input-section">
                            <h5 className="step-heading">
                                Please select a location where your business is based:
                                <Popup className="my-popup-content" trigger={<span style={{marginLeft:5}}><BsInfoCircleFill className="infoBtn"/></span>} position="top"><PopupInfo info={"locations"}/></Popup>
                            </h5>

                            <LocationOptions selectLocation={(location)=>setUserSelectedLocation(location)} chosenLocation={userSelectedLocation}/>

                        </div>
                        :
                        null
                    }

                </div>
            </>
            :
            null
        }


        {step > 0?
            <div className="nextPrev"> 
                <div>
                    <BsChevronLeft className={"active-application-button"} size={30} onClick={previousStep}/>
                    <BsChevronRight className={"active-application-button"}  size={30} onClick={nextStep} />

                </div>
            </div>
            :
            null
        }


        <Popup modal open={showErr} onClose={()=>{setErr(""); setShowErr(false)}}>
            <div class="alert alert-danger" role="alert">{err}</div>
        </Popup>

        </div>
    )
}
export default Step1