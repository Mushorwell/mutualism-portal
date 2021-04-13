import React, {useEffect, useState} from 'react';
import StatusBlock from "./StatusBlock";
import Popup from "reactjs-popup";
import Loader from "react-loader-spinner";
import Slider from "react-slick";
import { IoOptions } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5"
import ServiceCard from "./ServiceCard";
import Consultant from "./Consultant";

const Consulting = (props)=>{

    const [fetchInProgress, setFetchInProgress]= useState(true);
    // const [activeStatus, setActiveStatus]= useState(false);
    // const [serviceData, setServiceData] = useState([]);
    // const [selectedService,setSelectedService] = useState(1);
    const [consultantData, setConsultantData] = useState([]);
    const [zohoURL,setZohoURL] = useState("");
    const [selectedConsultant,setSelectedConsultant] = useState(0);
    const [consultantProfile,setConsultantProfile] = useState();

    useEffect(()=>{

        // fetch(`https://mutualism-test.herokuapp.com/api/getServices`)
        //     .then((response)=>response.json())
        //     .then(services=> {
        //         let Data = JSON.parse(services.data);
        //         setServiceData(Data);
        //     });

        // get consultants data
        fetch(`https://mutualism-test.herokuapp.com/api/getConsultants`)
            .then((response)=>response.json())
            .then(consultants=> {
                let Data;
                Data = consultants.data;
                setConsultantData(Data);
            });

    }, []);

    // loader settings
    const viewLoad = ()=>{
        return(
            <Popup modal position="right center" open={true} closeOnDocumentClick={false}>
                <Loader type="Grid" color="#212529" height={100} width={100}/>
            </Popup>
        );
    }

    // when user clicks on card
    // const selectCard = (id)=>{
    //     setSelectedService(id);
    //     setZohoURL("");
    //     setSelectedConsultant(0);
    //     console.log("service id ",id);

    // }

    // show consultant's profile on the right hand side of page
    const showProfile = (zoho_booking_url,consultant_id,consultant_object) =>{
        setZohoURL(zoho_booking_url);
        setSelectedConsultant(consultant_id);
        setConsultantProfile(consultant_object);
    }

    const viewPage = () => {
        // settings for adverts carousel
        // const settings = {
        //     className: "",
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 3,
        //     focusOnSelect: true,
        //     initialSlide: 0,
        //     responsive: [
        //         {
        //             breakpoint: 1200,
        //             settings: {
        //                 slidesToShow: 2,
        //                 slidesToScroll: 2
        //             }
        //         },
        //         {
        //             breakpoint: 1000,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //             }
        //         }
        //     ]
        // };

        return(
            <>
                <StatusBlock heading={"Business Consulting"} body={"We use our resources to guide and educate entrepreneurs on how to optimize their businesses."}/>

                {/* {activeStatus? <StatusBlock use={"summary"} /> : ""} */}
                {/* <div className="row services-section">
                    <Slider {...settings}>
                        {serviceData.map((obj, index)=>(
                            // console.log(obj.),
                            <ServiceCard
                                key={index.toString()}
                                id={obj.pk}
                                name={obj.fields.service_name}
                                description={obj.fields.service_description}
                                price={obj.fields.service_price}
                                image={obj.fields.service_image}
                                selectedService={selectedService}
                                click={selectCard}

                            />
                        ))}
                    </Slider>
                </div> */}
                <div>
                    <div className="consultants-sector">
                        <div className="dashboard-components container">
                            <div className="row consultants-section">
                                <div className="col-sm-12 col-xl-6 consultant-available">
                                    <div className="row consultant-head">
                                        <div className="col-md-6 consultant-list-heading service-heading">Available Consultants</div>
                                        <div className="col-md-6 consultant-filter-section row">
                                            {/* <div className="col-md-5 skills-filter">Filter skills:</div> */}
                                            {/* <div className="col-md-6 skills-filter">
                                                <Popup  trigger={<button className="btn btn-dark skills-filter-button">
                                                    <IoOptions className="filter-button-icons"/>
                                                    <span className="filter-button-spacerL"/>
                                                    <>Filter</>
                                                    <span className="filter-button-spacerR"/>
                                                    <IoChevronDown className="filter-button-icons"/>
                                                </button>}>

                                                </Popup>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="consltant-list">
                                        {consultantData.map((obj, index)=>(
                                            <Consultant
                                                key={index.toString()}
                                                id={obj.consultantID}
                                                firstName={obj.first_name}
                                                lastName={obj.last_name}
                                                image={obj.image}
                                                bio={obj.bio}
                                                zoho_booking_url={obj.zohoURl}
                                                click={showProfile}
                                                consultantObj={obj}
                                                selectedConsultant={selectedConsultant}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-xl-6 consultant-booking">
                                    <div className="row consultant-head">
                                        <div className="col-md-6 consultant-list-heading service-heading" style={{margin:"auto"}}>Book Consultation</div>
                                        <div className="col-md-6 consultant-list-heading"></div>
                                    </div>
                                    <div className="row consultant-booking-content">
                                        {zohoURL == ""?

                                            <p style={{color:'gray',fontSize:12}}>Please select a consultant in order to book a consultation.</p>
                                            :
                                            <>
                                            {/* <a href={zohoURL} target="_blank">Book</a> */}
                                                <div className="consultantProfilePreview">
                                                    <img src={`https://testing-bt.s3.amazonaws.com/${consultantProfile.image}`} alt="Mutualism Consultant" width={60} height={60}/>
                                                    <div>
                                                        <p style={{fontWeight:'bold',margin:0}}>{consultantProfile.first_name} {consultantProfile.last_name}</p> 
                                                        <p style={{color:'gray',fontSize:12}}>{consultantProfile.email}</p>
                                                    </div> 
                                                </div>
                                                <p className="consultantBio">{consultantProfile.bio}</p>
                                                <button onClick={()=>window.open(consultantProfile.zohoURl)} className="btn btn-dark skills-filter-button">Book</button>
                                            </>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // show loader until consultant data is populated
    return (
        <>
            { consultantData.length == 0 ? viewLoad() : viewPage() }
        </>
    )
}
export default Consulting