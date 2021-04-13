import React, {useState} from 'react';
import Select from 'react-select';
import {BsInfoCircleFill} from "react-icons/bs";

const IndustryType = (props) => {

    const options = [
        {value: 'construction', label: 'Construction'},
        {value: 'finance & insurance', label: 'Finance and Insurance'},
        {value: 'science & technology', label: 'Scientific and Technology Services'},
        {value: 'retail & wholesale', label: 'Retail and Wholesale Trade'},
        {value: 'real estate & leasing', label: 'Real Estate, Rental and Leasing'},
        {value: 'health care & social assistance', label: 'Health Care and Social Assistance'},
        {value: 'waste', label: 'Waste Management'},
        {value: 'transport & warehousing', label: 'Transportation and Warehousing'},
        {value: 'arts & entertainment', label: 'Arts and Entertainment'},
        {value: 'agriculture', label: 'Agriculture'},
        {value: 'manufacturing', label: 'Manufacturing'},
        {value: 'food', label: 'Food Services'},
        {value: 'education', label: 'Education'},
        {value: 'travel & tourism', label: 'Travel and Tourism'},
        {value: 'sports & recreation', label: 'Sports and Recreation'},
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

    const IndustryTypeSelect = () => (
        <div style={{width: "80%"}} className="location-input-container">
            <Select
                options={options}
                value={props.industryType}
                onChange={props.setIndustryType}
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
        </div>
    );
    return (
        <div style={props.show?{width:"100%"}:{display:"none"}}>
            <div className="input-section" style={{width: "100%"}}>
                <div>
                    <h5 className="step-heading">
                        Please select your business sector
                    </h5>
                </div>
                <IndustryTypeSelect/>
                <p className="errorMessage" style={props.errors?null:{display:"none"}}>
                    {props.errors}<BsInfoCircleFill className="infoBtn"/>
                </p>
            </div>
            <br/>
        </div>
    );
}

export default IndustryType;