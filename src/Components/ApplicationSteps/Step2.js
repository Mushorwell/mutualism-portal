import React, {useEffect, useState} from 'react';
import Content from "./Step2/Content";
import Navigate from "./Step2/Navigate";
const Step2 = (props)=>{

    const [businessDetailsStage, setBusinessDetailsStage] = useState(1);
    const [allowNextStage, setAllowNextStage] = useState(false);
    const [errors, setErrors] = useState({
        /********************** All possible Errors *****************************/
        // businessBasicDetailInputs: {
        //      industryInputNoSelect:'Please select the closest industry sector your business can fall under.',
        //      teamSizeNoInput = 'Please enter the size of your team.'
        //      businessDescriptionNoText:'Your description must be at least 75 characters long with no trailing spaces.',
        //      businessDescriptionTextTooShort:'Please enter a brief description of your business.'
        // },
        // businessTechnicalDetailInputs: {
        //      cipcInputNoText:'Please enter your business CIPC registration number.',
        //      cipcInputInvalid:'',
        //      cipcInputTooShort:'',
        //      cipcInputTooLong:'',
        //      sarsInputNoText:'Please enter your business SARS registration number.',
        //      sarsInputInvalid:'',
        //      sarsInputTooShort:'',
        //      sarsInputTooLong:'',
        //      financialsStartDateInputNull:'Please enter the starting date of your financial records.',
        //      financialsStartDateInvalid:'',
        //      financialsEndDateInputNull:'Please enter the end date of your financial records.',
        //      financialsEndDateInvalid:'',
        //      debtStatusNoInput:'Please select if your recent debt is active or has been cleared.',
        //      borrowedAmountEqualsZero:'Please specify an amount for your recent debt.',
        //      dateBorrowedInputNull:'Please enter the date when you borrowed the amount.',
        //      dateBorrowedInputInvalid:'',
        //      dateClearedInputNull:'Please enter a the date when you cleared the debt.',
        //      dateClearedInputInvalid:''
        // }
    });

    // useEffect(()=>{
    //
    // },[allowNextStage])

    return(
        <div className="step1">
            <h1 className="status-heading">Business funding application</h1>
            <p className="status-body business-application-summary-text">
                Tell us more about your business so that we can see how best we can provide you with assistance in helping you succeed.
            </p>
            <Content
                businessDetailsStage={businessDetailsStage}
                allowNextStage={allowNextStage}
                setAllowNextStage={setAllowNextStage}
                errors={errors}
            />
            <Navigate
                businessDetailsStage={businessDetailsStage}
                setBusinessDetailsStage={setBusinessDetailsStage}
                allowNextStage={allowNextStage}
                setAllowNextStage={setAllowNextStage}
                errors={errors}
                setErrors={setErrors}
                previousStep={props.previousStep}
                nextStep={props.nextStep}
            />
        </div>
    );
}
export default Step2