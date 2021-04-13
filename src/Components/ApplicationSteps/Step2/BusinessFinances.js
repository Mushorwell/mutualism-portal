import React, {useState} from "react";
import {BsInfoCircleFill} from "react-icons/bs";

const BusinessFinances = (props) => {

    const handleFinancialsOption = (event) => {
        let chosen = event.target.id;
        (chosen==='availableRecords')?props.setHasFinances(true):props.setHasFinances(false);
        // localStorage.setItem('hasFinancials', JSON.stringify(props.hasFinances));
        // console.log(JSON.parse(localStorage.getItem('hasFinancials')));
    }

    const handleFinancialStartDate = (event) => {
        let date = event.target.value;
        props.setFinancialsPeriod({
            ...props.financialsPeriod,
            startDate: date.toString()
        });
        // localStorage.setItem('financialsStartDate', props.financialsPeriod.startDate);
        // console.log(JSON.parse(localStorage.getItem('hasFinancials')));
    }

    const handleFinancialEndDate = (event) => {
        let date = event.target.value;
        props.setFinancialsPeriod({
            ...props.financialsPeriod,
            endDate: date.toString()
        });
        // localStorage.setItem('financialsEndDate', props.financialsPeriod.endDate);
    }
    // console.log(JSON.parse(localStorage.getItem('financialsEndDate')));

    return(
        <div className="input-section" style={props.show?null:{display:"none"}}>
            <h3 className="step-heading" style={{marginTop:40}}>Financial Records</h3>
            <div className="application-form inline-input-elements">
                <button className={`card1`} id="noRecords" onClick={handleFinancialsOption} style={!props.hasFinances?{border: "solid 1px #007A4D"}:{border: "none"}}>
                    <h6 className="step-heading" id="noRecords">No Financial Records</h6>
                    <p className="small" id="noRecords">My business has no financial records that can be provided with this application.</p>
                    <p className="small note" id="noRecords">(No documentation for financials required.)</p>
                    <div className="go-corner" id="noRecords"></div>
                </button>
                <button className={`card1`} id="availableRecords" onClick={handleFinancialsOption} style={props.hasFinances?{border: "solid 1px #007A4D"}:{border: "none"}}>
                    <h6 className="step-heading" id="availableRecords">Available Financial Records</h6>
                    <p className="small" id="availableRecords">My business financial records that can be provided with this application.</p>
                    <p className="small note" id="availableRecords">(Documentation for financials required.)</p>
                    <div className="go-corner" id="availableRecords"></div>
                </button>
            </div>
            <div className="application-form" style={(props.hasFinances===true)?null:{display:"none"}}>
                <h4 className="step-heading" style={{marginTop:40}}>
                    Financial History
                </h4>
                <div><h5 className="step-heading">My financials cover the period from</h5></div>
                <div className="application-form inline-input-elements">
                    <div>
                        <input
                            type="date"
                            name="financials-start-date"
                            id="financials-start-date"
                            className="location-input business-details-input-box"
                            value={props.financialsPeriod.startDate}
                            onChange={handleFinancialStartDate}
                        />
                        <p className="errorMessage" style={props.errors.financialsStartDateInputNull?null:{display:"none"}}>
                            {props.errors.financialsStartDateInputNull}<BsInfoCircleFill className="infoBtn"/>
                        </p>
                    </div>
                    <div><h5 className="step-heading">to</h5></div>
                    <div>
                        <input
                            type="date"
                            name="financials-end-date"
                            id="financials-end-date"
                            className="location-input business-details-input-box"
                            value={props.financialsPeriod.endDate}
                            onChange={handleFinancialEndDate}
                        />
                        <p className="errorMessage" style={props.errors.financialsEndDateInputNull?null:{display:"none"}}>
                            {props.errors.financialsEndDateInputNull}<BsInfoCircleFill className="infoBtn"/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessFinances;