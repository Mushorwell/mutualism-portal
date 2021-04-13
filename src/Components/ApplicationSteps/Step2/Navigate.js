import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import React, {useEffect} from "react";

const Navigate = (props) => {
    const prevQuestions = () => {
        (props.businessDetailsStage!==1)?props.setBusinessDetailsStage(props.businessDetailsStage-1):props.previousStep();
    }

    const nextQuestions = () => {
        (props.businessDetailsStage!==2)?props.setBusinessDetailsStage(props.businessDetailsStage+1):props.nextStep();
    }

    const financeAndDebtCheck = (finance, debt) => {
        if (finance&&debt) {
            return 1;
        }
        if ((finance)&&(debt===false)){
            return 2;
        }
        if ((finance===false)&&(debt)){
            return 3;
        }
        if ((finance===false)&&(debt===false)){
            return 0;
        }
    }

    let allowNextStage = false;

    const validateInput = () =>{
        const industryTypeState = JSON.parse(localStorage.getItem('industryType')).value;
        const summary = localStorage.getItem('businessDescription').trim();
        const cipcReg = localStorage.getItem('businessRegistrationProofCipc').trim();
        const sarsReg = localStorage.getItem('businessRegistrationProofSars').trim();
        const financialsPeriod = {
            startDate:localStorage.getItem('financialsStartDate').trim(),
            endDate:localStorage.getItem('financialsEndDate').trim()
        }
        const hasFinancials = JSON.parse(localStorage.getItem('hasFinancials'));
        const hasDebtHistory = JSON.parse(localStorage.getItem('hasDebtHistory'));
        const debtHistory = {
            borrowedAmount: Number(localStorage.getItem('borrowedAmount')),
            debtStatus: JSON.parse(localStorage.getItem('debtStatus')).value,
            dateBorrowed: localStorage.getItem('dateBorrowed'),
            dateCleared: localStorage.getItem('dateDebtCleared')
        }

        switch(props.businessDetailsStage){
            case 1:
                if((industryTypeState!=="industry")&&(summary.length>=75)) {
                    props.setAllowNextStage(true);
                    allowNextStage=true;
                }else{
                    props.setAllowNextStage(false);
                    allowNextStage=false;
                };
                break;
            case 2:
                if((cipcReg!=='')&&(sarsReg!=='')) {
                    const financeAndDebt = financeAndDebtCheck(hasFinancials,hasDebtHistory);

                    switch (financeAndDebt){
                        case 1:
                            (financialsPeriod.startDate!=='')&&(financialsPeriod.endDate!=='')&&
                            (debtHistory.borrowedAmount!==0)&&(debtHistory.debtStatus!=='')&&
                            (debtHistory.dateBorrowed!=='')||(debtHistory.dateCleared) ?
                                allowNextStage=true :
                                allowNextStage=false;
                            break;
                        case 2:
                            (financialsPeriod.startDate!=='')&&(financialsPeriod.endDate!=='') ?
                                allowNextStage=true :
                                allowNextStage=false;
                            break;
                        case 3:
                            (debtHistory.borrowedAmount!==0)&&(debtHistory.debtStatus!=='')&&
                            (debtHistory.dateBorrowed!=='')||(debtHistory.dateCleared) ?
                                allowNextStage=true :
                                allowNextStage=false;
                            break;
                        default:
                            allowNextStage=true;
                            break;
                    }
                }
                else {
                    allowNextStage=false;
                }
        }
    };

    useEffect(()=>{

    },[props.allowNextStage]);

    const showErrors = () => {
        const errorList = {};
        switch(props.businessDetailsStage){
            case 1:
                if(JSON.parse(localStorage.getItem('industryType')).value==="industry") {
                    errorList.industryInputNoSelect = 'Please select the closest industry sector your business can fall under.'
                }
                if(Number(localStorage.getItem('teamSize'))===0){
                    errorList.teamSizeNoInput = 'Please enter the size of your team.'
                }
                if(localStorage.getItem('businessDescription').trim().length<75){
                    errorList.businessDescriptionTextTooShort = 'Your description must be at least 75 characters long with no trailing spaces.'
                }
                if(localStorage.getItem('businessDescription').trim()==='') {
                    errorList.businessDescriptionNoText = 'Please enter a brief description of your business.'
                }
                break;
            case 2:
                if(localStorage.getItem('businessRegistrationProofCipc').trim()==='') {
                    errorList.cipcInputNoText = 'Please enter your business CIPC registration number.'
                }
                if(localStorage.getItem('businessRegistrationProofSars').trim()==='') {
                    errorList.sarsInputNoText = 'Please enter your business SARS registration number.'
                }
                switch (JSON.parse(localStorage.getItem('hasFinancials'))){
                    case true:
                        if(localStorage.getItem('financialsStartDate').trim()==='') {
                            errorList.financialsStartDateInputNull = 'Please enter the starting date of your financial records.'
                        }
                        if(localStorage.getItem('financialsEndDate').trim()===''){
                            errorList.financialsEndDateInputNull = 'Please enter the end date of your financial records.'
                        }
                        break;
                    default:
                        break;
                }
                switch (JSON.parse(localStorage.getItem('hasDebtHistory'))){
                    case true:
                        if(Number(localStorage.getItem('borrowedAmount'))===0) {
                            errorList.borrowedAmountEqualsZero = 'Please specify an amount for your recent debt.'
                        }
                        if(JSON.parse(localStorage.getItem('debtStatus')).value==='status') {
                            errorList.debtStatusNoInput = 'Please select if your recent debt is active or has been cleared.'
                        }
                        if(localStorage.getItem('dateBorrowed')===''){
                            errorList.dateBorrowedInputNull = 'Please enter the date when you borrowed the amount.'
                        }
                        switch (JSON.parse(localStorage.getItem('debtStatus')).value){
                            case "cleared":
                                if((localStorage.getItem('dateDebtCleared')==='')||(localStorage.getItem('dateDebtCleared'))) {
                                    errorList.dateClearedInputNull = 'Please enter a the date when you cleared the debt.'
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
        }
        props.setErrors(errorList);
    }

    const handleClickNext = () => {
        validateInput();
        if (allowNextStage) {
            nextQuestions();
        } else {
            showErrors();
        }
    }

    return(
        <div className="nextPrev">
            <div>
                <BsChevronLeft className={"active-application-button"} size={30} onClick={prevQuestions}/>
                <BsChevronRight className={"active-application-button"}  size={30} onClick={handleClickNext}/>
            </div>
        </div>
    );
}

export default Navigate;