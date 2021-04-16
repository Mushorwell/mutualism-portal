import React, {useState} from "react";
import Select from "react-select";
import {BsInfoCircleFill} from "react-icons/bs";

const DebtHistory = (props) => {

    const debtStatusOptions = [
        {value: 'active', label: 'Active'},
        {value: 'cleared', label: 'Cleared'}
    ];

    const colourStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#46A16E' : 'white',
          }),
    }

    const DebtStatus = () => (
        <div style={{width: "100%"}} className="location-input-container">
            <Select
                options={debtStatusOptions}
                value={props.debtHistory.debtStatus}
                onChange={handleStatusChange}
                isSearchable={false}
                noOptionsMessage={() => 'Please select from the available options.'}
                className="location-input"
                styles={colourStyles}
                theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: 'black',
                    },
                })}
            />
            <p className="errorMessage" style={props.errors.debtStatusNoInput?null:{display:"none"}}>
                {props.errors.debtStatusNoInput}<BsInfoCircleFill className="infoBtn"/>
            </p>
        </div>
    );

    const handleStatusChange = (selected) => {
        props.setDebtStatus(selected.value);
        props.setDebtHistory({
            ...props.debtHistory,
            debtStatus: selected
        });
        // localStorage.setItem('debtStatus', props.debtStatus);
    }

    const handleDebtOption = (event) => {
        let chosen = event.target.id;
        (chosen==='availableRecords')?props.setHasHistory(true):props.setHasHistory(false);
        // localStorage.setItem('hasDebtHistory', props.hasHistory);
    }

    const handleDateCleared = (event) => {
        props.setDebtHistory({
            ...props.debtHistory,
            dateCleared: event.target.value.toString()
        });
        // localStorage.setItem('dateDebtCleared', props.debtHistory.dateCleared);
    }

    const handleBorrowedAmount = (event) => {
        props.setDebtHistory({
            ...props.debtHistory,
            borrowedAmount: event.target.value
        });
        // localStorage.setItem('borrowedAmount', props.debtHistory.borrowedAmount)
    }

    const handleDateBorrowed = (event) => {
        props.setDebtHistory({
            ...props.debtHistory,
            dateBorrowed: event.target.value.toString()
        });
        // localStorage.setItem('dateBorrowed', props.debtHistory.dateBorrowed)
    }

    const DebtCleared = () => {
        return(
            <div className="application-form inline-input-elements">
                <div><h5 className="step-heading">Date Cleared: </h5></div>
                <div>
                    <input
                        type="date"
                        name="dateCleared"
                        id="dateCleared"
                        className="location-input business-details-input-box"
                        value={props.debtHistory.dateCleared}
                        onChange={handleDateCleared}
                    />
                    <p className="errorMessage" style={props.errors.dateClearedInputNull?null:{display:"none"}}>
                        {props.errors.dateClearedInputNull}<BsInfoCircleFill className="infoBtn"/>
                    </p>
                </div><br/>
            </div>
        )
    }

    return(
        <div className="input-section" style={props.show?null:{display:"none"}}>
            <h3 className="step-heading" style={{marginTop:40}}>Debt History</h3>
            <div className="application-form inline-input-elements">
                <button className={`card1`} id="noRecords" onClick={handleDebtOption} style={!props.hasHistory?{border: "solid 1px #007A4D", background:"#007A4D", color:"#ffffff"}:{border: "none"}}>
                    <h6 className="step-heading" id="noRecords">No Debt History</h6>
                    <div className="go-corner" id="noRecords"></div>
                </button>
                <button className={`card1`} id="availableRecords" onClick={handleDebtOption} style={props.hasHistory?{border: "solid 1px #007A4D", background:"#007A4D", color:"#ffffff"}:{border: "none"}}>
                    <h6 className="step-heading" id="availableRecords">Have Debt History</h6>
                    <div className="go-corner" id="availableRecords"></div>
                </button>
            </div>
            <div className="application-form" style={(props.hasHistory===true)?null:{display:"none"}}>
                <div><h5 className="step-heading" style={{marginTop:20}}>Details of my most recent loan</h5></div>
                <br/>
                <div className="application-form inline-input-elements">
                    <DebtStatus/>
                </div><br/>
                <div className="application-form inline-input-elements" style={(props.debtHistory.debtStatus.value!=='status')?null:{display:"none"}}>
                    <div>
                        <h5 className="step-heading">Borrowed amount: </h5>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="borrowedAmount"
                            id="borrowedAmount"
                            placeholder="amount"
                            className="location-input business-details-input-box"
                            value={props.debtHistory.borrowedAmount}
                            onChange={handleBorrowedAmount}
                        />
                        <p className="errorMessage" style={props.errors.borrowedAmountEqualsZero?null:{display:"none"}}>
                            {props.errors.borrowedAmountEqualsZero}<BsInfoCircleFill className="infoBtn"/>
                        </p>
                    </div>
                </div><br/>
                <div className="application-form inline-input-elements" style={(props.debtHistory.debtStatus.value!=='status')?null:{display:"none"}}>
                    <div><h5 className="step-heading">Date Borrowed: </h5></div>
                    <div>
                        <input
                            type="date"
                            name="loan-start-date"
                            id="loan-start-date"
                            className="location-input business-details-input-box"
                            value={props.debtHistory.dateBorrowed}
                            onChange={handleDateBorrowed}
                        />
                        <p className="errorMessage" style={props.errors.dateBorrowedInputNull?null:{display:"none"}}>
                            {props.errors.dateBorrowedInputNull}<BsInfoCircleFill className="infoBtn"/>
                        </p>
                    </div>
                </div><br/>
                {props.debtHistory.debtStatus.value === 'cleared' ? DebtCleared(): null}
            </div>
        </div>
    );
}

export default DebtHistory;