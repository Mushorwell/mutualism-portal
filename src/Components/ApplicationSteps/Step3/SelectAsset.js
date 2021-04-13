import Select from "react-select";
import React from "react";
import {BsInfoCircleFill} from "react-icons/bs";

const SelectAsset = (props) => {
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

    return (
        <div style={{width: "80%"}} className="location-input-container">
            <Select
                options={props.options}
                value={props.value}
                onChange={props.onChange}
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
            <p className="errorMessage" style={props.errors?null:{display:"none"}}>
                {props.errors}<BsInfoCircleFill className="infoBtn"/>
            </p>
        </div>
    );
}
export default SelectAsset;