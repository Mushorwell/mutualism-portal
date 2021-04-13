import React, {useState,useEffect} from 'react';
import Popup from "reactjs-popup";
import Loader from "react-loader-spinner";
import ApplicationSteps from './ApplicationSteps';
import Step1 from '../Components/ApplicationSteps/Step1';
import Step2 from '../Components/ApplicationSteps/Step2';
import Step3 from '../Components/ApplicationSteps/Step3';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import {authentication} from '../firebase/firebase';
const Applicant = ()=>{
    const [activeStep,setActiveStep] = useState(1);
    const [showButtons,setShowButtons] = useState(false);
    const [confirm,setConfirm] = useState(false);
    const [submitting,setSubmitting] = useState(false);
    const [hasExistingApplication,setHasExistingApplication] = useState();
    const [applicationStatus,setApplicationStatus] = useState();

    const nextStep =()=>{
        activeStep < 3? setActiveStep(activeStep+1):setActiveStep(activeStep);
        // check if user is submitting
        if(activeStep == 3){
            // console.log("submit ",activeStep);
            setConfirm(true);
        }
    }
    

    const previousStep = ()=>{
        activeStep > 1? setActiveStep(activeStep-1):setActiveStep(activeStep)
    }

    const renderStepContent = ()=>{
        if(activeStep == 1 ){
            return <Step1 nextStep={nextStep}/>
        }
        else if(activeStep == 2){
            return <Step2 nextStep={nextStep} previousStep={previousStep}/>
        }else{
            return <Step3 nextStep={nextStep} previousStep={previousStep}/>
        }
    }

    const submittApplication = ()=>{
        setSubmitting(true);
        // get items
        var user_id = authentication.currentUser.uid;
        var business_stage = localStorage.getItem("stageOfBusiness");
        var business_location = localStorage.getItem("userLocation");
        var business_sector = localStorage.getItem("industryType").value;
        var business_team_size = localStorage.getItem("teamSize");
        var business_description = localStorage.getItem("businessDescription");
        var business_cipc_number = localStorage.getItem("businessRegistrationProofCipc");
        var business_sars_number = localStorage.getItem("businessRegistrationProofSars");
        var business_has_financial_records = JSON.parse(localStorage.getItem("hasFinancials"));
        var business_has_existing_debt = JSON.parse(localStorage.getItem("hasDebtHistory"));
        var required_asset = localStorage.getItem("assetRequiredType").value;
        var asset_price = localStorage.getItem("assetRequiredPrice");

        // business stage
        if(business_stage == 10){
            business_stage =  "Ideation";
        }
        else if(business_stage == 20){
            business_stage =  "Newly operational";
        }
        else if(business_stage == 30){
            business_stage =  "Operating";
        }
        else{
            business_stage =  "Growing";
        }
        
        
        fetch(`https://mutualism-test.herokuapp.com/api/createApplication`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:`userId=${user_id}&business_stage=${business_stage}&business_location=${business_location}&business_sector=${business_sector}&business_team_size=${business_team_size}&business_description=${business_description}&business_cipc_number=${business_cipc_number}&business_sars_number=${business_sars_number}&business_has_financial_records=${business_has_financial_records}&business_has_existing_debt=${business_has_existing_debt}&required_asset=${required_asset}&asset_price=${asset_price}`    
        })
        .then(re=>re.json())
        .then(re=>{
            setSubmitting(false);
            setConfirm(false);
            setHasExistingApplication(true);
        })
    }

    const getApplicationStatus = ()=>{
        fetch(`https://mutualism-test.herokuapp.com/api/getApplicationStatus?userId=${authentication.currentUser.uid}`)
        .then(re=>re.json())
        .then(re=>{
            setHasExistingApplication(re.data);
            setApplicationStatus(re.application_status);

        })
    }

    useEffect(()=>{
        getApplicationStatus()
    },[hasExistingApplication])



    return(
        <>
            {hasExistingApplication == false?<ApplicationSteps activeStep={activeStep}/>:null}
            {hasExistingApplication == undefined?
                <div className="application-form inline-input-elements">
                    <Loader type="ThreeDots" color="#212529" height={50} width={50}/>
                </div>
                :
                hasExistingApplication == false?
                    renderStepContent()
                :
                <>
                    <div className="application-form inline-input-elements">
                        <div className={`card1`} id="soweto"  style={{border: "none"}}>
                            <h6 className="step-heading location-heading" id="soweto">Application submitted</h6>
                            <p className="small step-heading" id="soweto">Your application was has been received and is under review.</p>
                            <p>Application status: {applicationStatus}</p>
                        </div>
                    </div>
                </>
            }


            {showButtons == true?
                <div className="nextPrev"> 
                    <div>
                        <BsChevronLeft className={activeStep  == 1? "inactive-application-button":"active-application-button"} size={30} onClick={previousStep}/>
                        <BsChevronRight className={activeStep  == 3? "inactive-application-button":"active-application-button"}  size={30} onClick={nextStep} />
                    </div>
                </div>
                :
                null
            }

            <Popup open={confirm} onClose={()=>setConfirm(false)}>
                {submitting == false?
                    <>
                        <h1 className="status-heading">Application complete.</h1>
                        <p className="status-body" style={{textAlign:'center',fontWeight:200,width:'80%'}}>
                            Application completed successfully, please confirm submission, by clicking the submit button below.
                        </p>
                        <button onClick={submittApplication} className="form-control sign-in-element submit-button application-form-button">
                            Submit
                        </button>
                    </>
                    :
                    <Loader type="Grid" color="#212529" height={100} width={100}/>
                }
            </Popup>
        </>
    )
}
export default Applicant