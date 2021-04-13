import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import React from "react";

const Navigate = (props) => {

    let assetRequiredType;
    let assetRequiredPrice;

    const prevQuestions = () => {
        props.previousStep();
    }

    const nextQuestions = () => {
        props.nextStep();
    }

    const assetAndPriceCheck = (asset, price) => {
        if (asset!=='asset'&&price>=500) {
            return 1;
        }
        if ((asset!=='asset')&&(price<500)){
            return 2;
        }
        if ((asset==='asset')&&((price>=500))){
            return 3;
        }
        if (((asset==='asset')&&(price<500))){
            return 0;
        }
    }

    let allowNextStage = false;

    const validateInput = () =>{
        assetRequiredType = JSON.parse(localStorage.getItem('assetRequiredType')).value;
        assetRequiredPrice = Number(localStorage.getItem('assetRequiredPrice'));

        const assetAndPrice = assetAndPriceCheck(assetRequiredType,assetRequiredPrice);

        switch(assetAndPrice){
            case 1:
                allowNextStage=true;
                break;
            case 2:
                allowNextStage=false;
                break;
            case 3:
                allowNextStage=false;
                break;
            default:
                allowNextStage=false;
                break;
        }

    };

    const showErrors = () => {
        const errorList = {};
        if(assetRequiredType==="asset") {
            errorList.assetTypeNoSelect = 'Please select the asset you want.'
        }
        if(assetRequiredPrice<500){
            errorList.assetPriceInvalid = 'Please enter a price estimate, minimum fund starts at R500.'
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
                <BsChevronRight className={"active-application-button"}  size={30} onClick={handleClickNext} />
            </div>
        </div>
    );
}

export default Navigate;