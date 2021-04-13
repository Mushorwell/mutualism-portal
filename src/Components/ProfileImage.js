import React, {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import {BsPerson} from 'react-icons/bs';
import {authentication} from '../firebase/firebase';

const ProfileImage = (props)=>{
    const [userDetails,setUserDetails] = useState([]);
    const aws_url = "https://testing-bt.s3.amazonaws.com/";

    useEffect(()=>{
        // get user profile if signed in
        authentication.onAuthStateChanged(user=>{
            if(user){
                var userId = user.uid;
                fetch("https://mutualism-test.herokuapp.com/api/getUser?userId="+userId)
                .then((re)=>re.json())
                .then((re)=>{
                    var user_data = JSON.parse(re.user);
                    var profile_data = JSON.parse(re.profile);
                    // console.log(user_data);
                    var user_firstname = user_data[0].fields.user_first_name;
                    var user_lastname = user_data[0].fields.user_last_name;
                    if(profile_data.length == 0){
                        setUserDetails([user_firstname,user_lastname,"none"]);
                    }else{
                        var user_dp = aws_url+profile_data[0].fields.profile_picture;
                        setUserDetails([user_firstname,user_lastname,user_dp]);
                    }
        
                })
            }
        })

    },[props.reload])

    // the partner profile image will only be visible when user is on one of the following pages:
    // financials, consulting, learn, profile or organise
    if(["financials", "consulting","learn", "profile","organise","applicant","main"].includes(props.page)){
        return ( 
            <div className="profileButton">
                <Link to={"profile"}>
                {userDetails.length == 0?

                    <div className="menu-rounded-icon noAccount">
                        <div>
                        </div>
                    </div>
                    :
                    <div className="menu-rounded-icon">
                        <div className="circled-menu-item">
                            {userDetails[2] == "none"?
                                <BsPerson size={30} style={{color:'#F4F5F9',opacity:0.6}}/>
                                :
                                <div style={{backgroundImage:'url('+userDetails[2]+')'}} className="profileImage"></div>
                            }
                        </div>
                    </div>
                }
                </Link>
                <Link to={"profile"}>
                <div className="userName">
                    {userDetails.length == 0?
                        (
                            <>
                                <div className="unsetUserName"><div></div></div>
                                <p style={{fontSize:12}}>Mutualism Portal</p>
                            </>
                        ):
                        (
                            <>
                                <div style={{fontWeight:'bold'}}><p>{userDetails[0]+" "+userDetails[1] }</p></div>
                                <p style={{fontSize:12}}>Mutualism Portal</p>
                            </>
                        )
                    }
                </div>
                </Link>
            </div> 
        )
    }else{
        return null;
    }
}
export default ProfileImage