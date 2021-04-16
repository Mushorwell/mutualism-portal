import React, {useEffect, useState} from 'react';
import Financials from '../Components/Financials';
import Consulting from '../Components/Consulting';
import Organise from '../Components/Organise';
import Profile from '../Components/Profile';
import ProfileImage from '../Components/ProfileImage';
import SignIn from '../Components/auth/SignIn';
import SignUp from '../Components/auth/SignUp';
import Applicant from '../Components/Applicant';
import PasswordReset from '../Components/auth/PasswordReset';
import NoMatch from "../Components/NoMatch";
import HeaderLogo from '../Images/Logos/mutualism-logo-white-no-text.svg';
import NavigationTab from '../Components/NavigationTab';
import {authentication} from '../firebase/firebase';
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";


const MainLayout = (props)=>{
    // when the state changes the top right profile tab updates/reloads
    const [profileReload,setProfileReload] = useState(false);
    const [isPartner,setIsPartner] = useState(null);
    const [showVerified,setVerified] = useState(false);

    // check if user is signed in, if not sign them out.
    useEffect(()=>{
        authentication.onAuthStateChanged((user)=>{
            if(user == null){
                props.updateAuthState(false);
                setIsPartner(false);
            }
            else if(user.emailVerified == false){
                props.updateAuthState(false);
                setIsPartner(false);
                // check if user is verified
                if(document.location.href.includes("mode=verify")){
                    // get the url parameters
                    var url_parameters = window.location.search;
                    // create new url search params to search for specific parameter values
                    const urlParams = new URLSearchParams(url_parameters);
                    // get code to verify email
                    authentication.applyActionCode(urlParams.get("oobCode"))
                    .then(()=>{
                        // email has been verified
                        setVerified(true);
                        setTimeout(()=>{
                            setVerified(false);
                        }, 4000)
                    })
                }
            }
            else{
                fetch(`https://mutualism-test.herokuapp.com/api/isPartner?userId=${user.uid}`)
                .then(re=>re.json())
                .then(re=>{
                    setIsPartner(re.is_partner);
                })

            }
        })

    },[]);

    // control the view that should be available on the portal depending on the props passed through by App.js
    const renderPage = ()=>{
        if(isPartner == false && props.page == "main"){
            return <Applicant/>
        }else if(props.page == "signIn"){
            return <SignIn updateAuthState={props.updateAuthState}/>;
        }else if(props.page == "signUp"){
            return <SignUp/>;
        }else if(props.page == "passwordReset"){
            return <PasswordReset/>;
        }else if(props.page == "main"){
            return <Financials/>;
        }else if(props.page == "consulting"){
            return <Consulting/>;
        }else if(props.page == "organise"){
            return <Organise/>;
        }else if(props.page == "profile"){
            return <Profile updateProfileTab={updateProfileTab}/>;
        }else{
            return <NoMatch/>
        }
    }

    // changing the state of the profile tab when it needs to be reloaded
    const updateProfileTab = ()=>{
        setProfileReload(!profileReload);
    }
    
    return(
        <div>
            <div>
                {showVerified == true?
                    <div className="emailVerififed animate__animated animate__fadeOut animate__delay-5s">
                        <p>Your email has been verified.</p>
                    </div>
                    :
                    null
                }


                <div className="navbar navbar-expand-lg navbar-dark justify-content-between" style={{backgroundColor: "#212529"}}>
                    <div className="container navTab">
                        <Link to={"/"}><img src={HeaderLogo} className="logo" alt="mutualism logo"/></Link>
                        <ProfileImage page={props.page} reload={profileReload}/>
                    </div>
                </div>
            </div>
            <div className="midBar">
                <div className="container menutab">
                    {isPartner == null?
                        <Loader type="ThreeDots" color="#212529" height={50} width={50}/>
                        :
                        <NavigationTab isPartner={isPartner} page={props.page}/>
                    }
                </div>
            </div>
            <div>
                <div className="container pageTab">

                    {isPartner == null?
                        <div className="loaderClass">
                            <Loader type="ThreeDots" color="#212529" height={50} width={50}/>
                        </div>
                        :
                        renderPage()
                    }
                </div>
            </div>

        </div>
    )
}
export default MainLayout