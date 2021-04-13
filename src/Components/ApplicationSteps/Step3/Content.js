import React, {useEffect, useState} from "react";
import SelectAsset from './SelectAsset';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "@material-ui/core/Slider";
import Input from '@material-ui/core/Input';
import {BsInfoCircleFill} from "react-icons/bs";

const useStyles = makeStyles({
    input: {
        boxShadow: "none",
        border:"none",
        borderBottom: "2px solid #007A4D"
    },
});

const Content = (props) => {
    const classes = useStyles();
    const [assetOptions, setAssetOptions] = useState([]);
    let [assetType, setAssetType] = useState(()=>{
        const assetRequiredType = localStorage.getItem('assetRequiredType');
        return assetRequiredType !== null
            ? JSON.parse(assetRequiredType)
            : {
                value:'asset',
                label:'Choose an asset...'
            };
    });
    let [assetCost, setAssetCost] = useState(()=>{
        const assetRequiredPrice = localStorage.getItem('assetRequiredPrice');
        return assetRequiredPrice!==null
            ? Number(assetRequiredPrice)
            :500;
    });

    useEffect(()=>{
        const filteredAssets = props.filterAssets(props.industry, props.allassets);
        props.setRelevantAssets(filteredAssets);
        let options = filteredAssets.map(arr => arr.items);
        let flatOptions = [];
        options.forEach(element => element.forEach(obj => flatOptions.push(obj)));
        setAssetOptions(flatOptions);

        localStorage.setItem('assetRequiredType', JSON.stringify(assetType));
        localStorage.setItem('assetRequiredPrice', assetCost.toString());
        },[assetType, assetCost]
    )

    const handleAssetSelected = (value) =>{
        setAssetType(value);
        props.setFinancingDetails({
            ...props.financingDetails,
            assetType: value
        });
        // localStorage.setItem('assetRequiredType', JSON.stringify(props.financingDetails.assetType));
    }

    const handleSlideChange = (event, newValue) => {
        setAssetCost(newValue);
        props.setFinancingDetails({
            ...props.financingDetails,
            assetPrice: newValue
        });
        // localStorage.setItem('assetRequiredPrice', props.financingDetails.assetPrice);
    }

    const handleInputChange = (event) => {
        setAssetCost(event.target.value === '' ? '' : Number(event.target.value));
        props.setFinancingDetails({
            ...props.financingDetails,
            assetPrice: assetCost
        });
    };

    const handleBlur = () => {
        if (assetCost < 500) {
            setAssetCost(500);
        } else if (assetCost > 200000) {
            setAssetCost(200000);
        }
    };

    return (
        <div className="input-section">
            <div className="applicationInfo application-form">
                <div><h5 className="step-heading" style={{marginTop:20}}>Select Asset</h5></div>
                <div style={{width:'100%'}}>
                    <div className="input-section" style={{width: "100%"}}>
                        <SelectAsset
                            options={assetOptions}
                            value={assetType}
                            onChange={handleAssetSelected}
                            errors={props.errors.assetTypeNoSelect}
                        />
                    </div>
                </div>
                <br/>
                <div style={assetType.value!=='asset'?null:{display:"none"}}>
                    <h5 className="step-heading">Please enter the cost of the asset</h5>
                    <br/><br/>
                    <div style={{width:"100%"}}>
                        <Slider
                            step={100}
                            min={500}
                            max={200000}
                            value={typeof assetCost === 'number' ? assetCost : 500}
                            aria-labelledby="discrete-slider-custom"
                            valueLabelDisplay="auto"
                            onChange={handleSlideChange}
                        />
                        <div style={{display:"flex", justifyContent:"space-around"}}>
                            <h5>R</h5>
                            <Input
                                className={classes.input}
                                value={assetCost}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 100,
                                    min: 500,
                                    max: 200000,
                                    type: 'number',
                                }}
                            />
                        </div>
                        <p className="errorMessage" style={props.errors.assetPriceInvalid?null:{display:"none"}}>
                            {props.errors.assetPriceInvalid}<BsInfoCircleFill className="infoBtn"/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;