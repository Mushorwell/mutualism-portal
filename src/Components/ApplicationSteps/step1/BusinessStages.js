import React from 'react';
import {BsCheck} from "react-icons/bs";

const BusinessStages = (props)=>{
    return(
        <div className="businessStage">
            {props.stage == 10?
                <>
                    <div className="required-item">
                        <BsCheck size={20} color={"#007A4D"}/>
                        <p>You have not yet filed the required CIPC and SARS documents.</p>
                    </div>
                    <div className="required-item">
                        <BsCheck size={20} color={"#007A4D"}/>
                        <p>You have an idea of your business, but the model has to be fully understood</p>
                    </div>
                    <div className="required-item">
                        <BsCheck size={20} color={"#007A4D"}/>
                        <p>Here is a link you may use to help register your business</p>
                    </div>
                    <div className="required-item">
                        <BsCheck size={20} color={"#007A4D"}/>
                        <p>Please refer to our consulting and education materials for help getting your business compliant</p>
                    </div>
                </>
                :
                props.stage == 20?
                    <>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Business has been operating for less than 6 months</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p> Business model is being tested but is not fully formed</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Has some compliance documents but is potentially missing some documents</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Financials are not clear/Financials need updating</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Here is a link you may use to help register your business</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Please refer to our consulting and education materials for help with your business model/compliance or financial services</p>
                        </div>
                    </>
                    :
                    props.stage == 30?
                        <>
                            <div className="required-item">
                                <BsCheck size={20} color={"#007A4D"}/>
                                <p>Business has all necessary CIPC documents and SARS compliance</p>
                            </div>
                            <div className="required-item">
                                <BsCheck size={20} color={"#007A4D"}/>
                                <p>Business has at least three months of previous financials</p>
                            </div>
                        </>
                    :
                    props.stage == 40?
                    <>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Business has all necessary CIPC documents and SARS compliance</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Business has at least three months of previous financials</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Looking to grow after finding success operating the business</p>
                        </div>
                        <div className="required-item">
                            <BsCheck size={20} color={"#007A4D"}/>
                            <p>Over a year plus operating, and clear opportunities for growth</p>
                        </div>
                    </>
                    :
                    null

            }
        </div>
    )
}
export default BusinessStages