import React, {useState} from "react";
import MutualismLogo from "../Images/Logos/mutualism-logo-black.svg";

const ServiceCard = (props) => {

    let imageUrl;
    props.image? imageUrl = `https://testing-bt.s3.amazonaws.com/${props.image}`: imageUrl="";

    let localization = {style:'currency', currency: 'ZAR'};
    let displayAsCurrency = (value) => new Intl.NumberFormat('en-ZA', localization).format(value);

    const handleClick = (id) => {
        props.click(id);
    };

    return(
        <div className="pad">
            <div className={`service-cards card`} id={props.selectedService == props.id? "selected-card":null} onClick={()=>handleClick(props.id)}>
                <div className="service-card-content">
                    <div className="service-details">
                        <div className="service-heading">
                            {props.name}
                        </div>
                        <div className="service-description">
                            {props.description}
                        </div>
                        <div className="service-pricing">
                            {displayAsCurrency(props.price)}
                        </div>
                    </div>
                    <div className="service-image" >
                        {
                            imageUrl ?
                            <img src={imageUrl} alt={props.name} className="service-icon"/> :
                            <img src={MutualismLogo} alt={props.name} className="service-icon"/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;