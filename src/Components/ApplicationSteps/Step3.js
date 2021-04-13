import React, {useState} from 'react';
import Content from "./Step3/Content";
import Navigate from "./Step3/Navigate";
const Step3 = (props)=>{

    const [financingDetails, setFinancingDetails] = useState({
        assetType: '',
        assetPrice: 0,
    });
    const [relevantAssets, setRelevantAssets] = useState([]);
    const [errors, setErrors] = useState({
        /********************** All possible Errors *****************************/
        //      assetTypeNoSelect: 'Please select the asset you want.'
        //      assetPriceInvalid: 'Please enter a price estimate, minimum fund starts at R500.'
    });
    const assets = [
        {
            category: "Agriculture",
            items: [
                {value: 'cattle fence', label: 'Cattle Fence'},
                {value: 'chicken layer cage', label: 'Chicken Layer Cage'},
                {value: 'chicken slaughter line', label: 'Chicken Slaughter Line'},
                {value: 'egg hatching incubator', label:'Egg Hatching Incubator'},
                {value: 'egg grading machine', label:'Egg Grading Machine'},
                {value: 'flour crashing machine', label:'Flour Crashing Machine'},
                {value: 'oil press machine', label: 'Oil Press Machine'},
                {value: 'pellet making machine', label:'Pellet Making Machine'},
                {value: 'pulper brush finisher',label:'Fruit/Vegetables Pulper Brush Finisher'},
                {value: 'pulper mill', label:'Fruit/Vegetables Pulper Mill'},
                {value: 'potato chip line', label:'Potato Chip Line (Crisp)'},
                {value: 'potato chip slicing machine', label:'Potato Chip Slicing Machine'},
                {value: 'vegetable dicer', label:'Vegetables Dicer'},
                {value: 'vegetable cutter', label:'Vegetables Cutter'},
                {value: 'vegetable washer', label:'Vegetables Washser'},
                {value: 'peanut butter machine', label:'Peanut Butter Machine'},
                {value: 'peanut skinner', label:'Peanut De-skinner Machine'}
            ]
        },
        {
            category: "Bottling",
            items: [
                {value:'ice machine', label:'Ice Block/Brick Machine'},
                {value:'bottle labeller', label:'Semi Auto Bottle Labelling'},
                {value:'water purification machine', label:'Water Purification Machine'},
            ]
        },
        {
            category: "Construction",
            items: [
                {value:'brick machine', label:'Brick Machine'},
                {value:'nail making machine', label:'Nail Making Machine'},
                {value:'razor barbed wire', label:'Razor Barbed Wire'},
            ]
        },
        {
            category: "Technology",
            items: [
                {value:'card printer machine', label:'Card Printer Machine'},
            ]
        },
        {
            category: "Manufacturing",
            items: [
                {value:'tooth pick making machine', label:'Toothpick Making Machine'},
                {value:'multi purpose heat press', label:'9 in 1 Multi Purpose Heat Press'},
                {value:'chalk machine', label:'Chalk Machine'},
                {value:'candle making machine', label:'Candle Making Machine'},
            ]
        },
        {
            category: "Logistics",
            items: [
                {value:'luggage wrapper', label:'Bag/Luggage Wrapper'},
            ]
        },
        {
            category: "Recreation",
            items: [
                {value:'candy floss machine', label:'Candy Floss Machine'},
                {value:'charcoal briquette machine', label:'Charcoal Briquette Machine'}
            ]
        },
        {
            category: "Soap",
            items: [
                {value:'detergent multi mixing tanks', label:'Detergent Multi Mixing Tanks'},
                {value:'soap making machine', label:'Soap Making Machine'},
                {value:'washing powder machine', label:'Washing Powder Machine'}
            ]
        },
        {
            category: "Recycling",
            items: [
                {value:'boiling ceiling', label:'Boiling Ceiling'},
                {value:'biodiesel machine', label:'Biodiesel Machine'},
                {value:'glass crusher', label:'Bottles/Glass Crusher'},
                {value:'pencil machine', label:'Pencil Machine'},
                {value:'plastic crusher', label:'Plastic Crusher Shredder Machine'}
            ]
        },
        {
            category: "Toilet Paper",
            items: [
                {value:'core machine', label:'Core Machine'}
            ]
        },
    ];

    const industry = JSON.parse(localStorage.getItem('industryType')).value;

    const filterAssets = (industry, assets) => {
        let assetsAvail;
        switch(industry){
            case 'construction':
                assetsAvail = assets.filter(obj=>obj.category === "Construction");
                // setRelevantAssets(assetsAvail);
                break;
            case 'finance & insurance':
                assetsAvail = assets.filter(obj=>obj.category === "Technology");
                // setRelevantAssets(assetsAvail);
                break;
            case 'science & technology':
                assetsAvail = assets.filter(obj=>obj.category === "Technology");
                // setRelevantAssets(assetsAvail);
                break;
            case 'retail & wholesale':
                assetsAvail = assets.filter(obj=>obj.category === "Technology").concat(
                    assets.filter(obj=>obj.category === "Bottling")).concat(
                        assets.filter(obj=>obj.category === 'Logistics')
                );
                // setRelevantAssets(assetsAvail);
                break;
            case 'waste':
                assetsAvail = assets.filter(obj=>obj.category === "Recycling");
                // setRelevantAssets(assetsAvail);
                break;
            case 'real estate & leasing':
                assetsAvail = assets.filter(obj=>obj.category === "Technology");
                // setRelevantAssets(assetsAvail);
                break;
            case 'health care & social assistance':
                assetsAvail = assets.filter(obj=>obj.category === "Technology");
                // setRelevantAssets(assetsAvail);
                break;
            case 'transport & warehousing':
                assetsAvail = assets.filter(obj=>obj.category === "Logistics");
                // setRelevantAssets(assetsAvail);
                break;
            case 'arts & entertainment':
                assetsAvail = assets.filter(obj=>obj.category === "Recreation");
                // setRelevantAssets(assetsAvail);
                break;
            case 'agriculture':
                assetsAvail = assets.filter(obj=>obj.category === "Agriculture");
                // setRelevantAssets(assetsAvail);
                break;
            case 'manufacturing':
                assetsAvail = assets.filter(obj=>obj.category === "Technology").concat(
                    assets.filter(obj=>obj.category === "Toilet Paper").concat(
                        assets.filter(obj=>obj.category === "Manufacturing")
                    )
                );
                // setRelevantAssets(assetsAvail);
                break;
            case 'food':
                assetsAvail = assets.filter(obj=>obj.category === "Agriculture");
                // setRelevantAssets(assetsAvail);
                break;
            case 'education':
                assetsAvail = assets.filter(obj=>obj.category === "Recycling");
                // setRelevantAssets(assetsAvail);
                break;
            case 'travel & tourism':
                assetsAvail = assets.filter(obj=>obj.category === "Recreation");
                // setRelevantAssets(assetsAvail);
                break;
            case 'sports & recreation':
                assetsAvail = assets.filter(obj=>obj.category === "Recreation");
                // setRelevantAssets(assetsAvail);
                break;
            default:
                assetsAvail = assets;
                break;
        }
        return assetsAvail;
    }

    return(
        <div className="step1">
            <h1 className="status-heading">Business funding application</h1>
            <p className="status-body">
                Please note that we currently only offer asset financing support.
            </p>
            <Content
                financingDetails={financingDetails}
                setFinancingDetails={setFinancingDetails}
                filterAssets={filterAssets}
                assets={relevantAssets}
                allassets={assets}
                industry={industry}
                setRelevantAssets={setRelevantAssets}
                errors={errors}
            />
            <Navigate
                errors={errors}
                setErrors={setErrors}
                previousStep={props.previousStep}
                nextStep={props.nextStep}
            />
        </div>
    )
}
export default Step3