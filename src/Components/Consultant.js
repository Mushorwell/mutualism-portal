import React from 'react';
import {BsPerson} from "react-icons/bs";

const Consultant = (props) => {

    // get image url for consultant to display image on consultant component
    let imageUrl;
    props.image? imageUrl = `https://testing-bt.s3.amazonaws.com/${props.image}`: imageUrl="";

    // display name for the consultant component
    let name = `${props.firstName} ${props.lastName}`;
    return(
        <>
            <div onClick={()=>props.click(props.zoho_booking_url,props.id,props.consultantObj)} className={props.selectedConsultant == props.id? "selected-consultant row consultant-list-item consultant":"row consultant-list-item consultant"}  >
                <div className="col-sm-3">
                    <div className="consultant-profile-image">
                        {
                         <img src={imageUrl} alt={name} width={60} height={60}/>
                        }
                    </div>
                </div>
                <div className="col-sm-9 consultant-info">
                    <h1 style={{fontSize:"15px"}}>{props.firstName} {props.lastName}</h1>
                    <p style={{fontSize:"12px"}}>{props.bio.substring(0,100)+"..."}</p>
                </div>
            </div>
        </>
    );
}

export default Consultant;