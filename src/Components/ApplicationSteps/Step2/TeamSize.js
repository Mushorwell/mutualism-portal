import React, {useEffect, useState} from "react";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import {makeStyles} from "@material-ui/core/styles";
import {BsInfoCircleFill} from "react-icons/bs";

const useStyles = makeStyles({
    input: {
        boxShadow: "none",
        border:"none",
        borderBottom: "2px solid #007A4D"
    },
});

const TeamSize = (props) => {

    const classes = useStyles();

    const handleSlideChange = (event, newValue) => {
        props.setTeamSize(newValue);
    }

    const handleInputChange = (event) => {
        props.setTeamSize(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (props.teamSize < 1) {
            props.setTeamSize(1);
        } else if (props.teamSize > 500) {
            props.setTeamSize(500);
        }
    };

    return(
        <div className="input-section" style={props.show?{width:"100%",marginTop:20}:{display:"none"}}>
            <h5 className="step-heading">Please enter the number of members in your team.</h5>
            <br/><br/>
            <div style={{width:"80%"}}>
                <Slider
                    step={1}
                    min={1}
                    max={500}
                    value={typeof props.teamSize === 'number' ? props.teamSize : 1}
                    aria-labelledby="discrete-slider-custom"
                    valueLabelDisplay="auto"
                    onChange={handleSlideChange}
                />
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <h5>Size of Team:</h5>
                    <Input
                        className={classes.input}
                        value={props.teamSize}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: 500,
                            type: 'number',
                        }}
                    />
                </div>
            </div>
            <p className="errorMessage" style={props.errors?null:{display:"none"}}>
                {props.errors}<BsInfoCircleFill className="infoBtn"/>
            </p>
            <br/>
        </div>
    );
}

export default TeamSize;