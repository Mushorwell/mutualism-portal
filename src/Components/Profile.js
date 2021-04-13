import React, {useEffect,useState} from 'react';
import {authentication} from '../firebase/firebase';
import Loader from 'react-loader-spinner';
import Popup from 'reactjs-popup';
import {BsUpload} from 'react-icons/bs';



const Profile = (props)=>{
    // states for the profile form data
    const [firstname,setFirstName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [bio,setBio] = useState("");
    const [dp,setDp] = useState("");
    const [loaderOpen,setLoaderOpen] = useState(true);
    const [userId,setUserId] = useState("");

    // aws s3 url
    const aws_url = "https://testing-bt.s3.amazonaws.com/";

    // watch profile data changes for page refresh
    useEffect(()=>{
        getProfile();
    },[])


    const getProfile = ()=>{
        // get profile if user is signed in
        authentication.onAuthStateChanged(user=>{
            if(user){
                var userId = user.uid;
                setUserId(userId);
                fetch("https://mutualism-test.herokuapp.com/api/getUser?userId="+userId)
                .then((re)=>re.json())
                .then((re)=>{
                    var user_data = JSON.parse(re.user);
                    var profile_data = JSON.parse(re.profile);
                    var user_firstname = user_data[0].fields.user_first_name;
                    var user_lastname = user_data[0].fields.user_last_name;
                    var user_email = user_data[0].fields.user_email_address;
                    var user_mobile = user_data[0].fields.user_mobile_number;
                    var user_middle_name = user_data[0].fields.user_middle_name;
                    var business_name = profile_data[0].fields.business_name;
                    var bio = profile_data[0].fields.profile_bio;
                    var user_dp = aws_url+profile_data[0].fields.profile_picture;
        
                    // set profile data
                    setFirstName(user_firstname);
                    setLastName(user_lastname);
                    setCompanyName(business_name);
                    setMiddleName(user_middle_name);
                    setEmail(user_email);
                    setBio(bio);
                    setMobile(user_mobile);
                    setDp(user_dp);
        
                    setLoaderOpen(false);
                    // update the top right profile tabe
                    props.updateProfileTab();
        
                });
            }
        })
    }

    const updateProfile = (e)=>{
        e.preventDefault();
        setLoaderOpen(true);
        // var userId = localStorage.getItem("token");
        // update profile
        fetch('https://mutualism-test.herokuapp.com/api/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:"first_name="+firstname+"&company_name="+companyName+"&bio="+bio+"&middle_name="+middleName+"&email="+email+"&last_name="+lastName+"&mobile="+mobile+"&userId="+userId,
        })
        .then((re)=>re.json())
        .then((re)=>{
            getProfile();
        })
    }

    const updateDp = ()=>{
        // var userId = localStorage.getItem("token");
        var file_input = document.getElementById("dpInput");
        var image = file_input.files[0]
        setLoaderOpen(true);

        var form_data = new FormData();
        form_data.append("profile_image", image);
        form_data.append("userId", userId);

        // update profile image
        if(file_input.files.length == 1){
            fetch('https://mutualism-test.herokuapp.com/api/updateProfileImage', {
                method: 'POST',
                body:form_data,
            })
            .then((re)=>re.json())
            .then((re)=>{
                getProfile();
            })
        }

    }

    // sign out partner
    const signout = ()=>{
        authentication.signOut();
    }
    return(
        <>
            <br/>
            <div className="row profileRow">
                <div className="col-sm-6">
                    <div className="dashboard-components middle-dash left-chart">
                        <h5>Profile details:</h5>
                        <form className="profileForm" onSubmit={updateProfile}>
                            <label>First name</label>
                            <input value={firstname} onChange={(val)=>{setFirstName(val.target.value)}} className="profileInput"/>
                            <label>Middle name</label>
                            <input value={middleName} onChange={(val)=>{setMiddleName(val.target.value)}} className="profileInput"/>
                            <label>Last name</label>
                            <input value={lastName} onChange={(val)=>{setLastName(val.target.value)}} className="profileInput"/>
                            <label>Email address</label>
                            <input value={email} onChange={(val)=>{setEmail(val.target.value)}} className="profileInput" disabled/>
                            <label>Mobile number</label>
                            <input value={mobile} onChange={(val)=>{setMobile(val.target.value)}} className="profileInput"/>
                            <label>Company name</label>
                            <input value={companyName} onChange={(val)=>{setCompanyName(val.target.value)}} className="profileInput"/>
                            <label>Bio</label>
                            <textarea value={bio} onChange={(val)=>{setBio(val.target.value)}} className="profileInput"/>
                            <button type="submit" className="form-control saveBtn">Save</button>
                        </form>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="dashboard-components middle-dash right-table profileTab">
                        <div className="profileImage" style={{backgroundImage:'url('+dp+')'}}></div>
                        <br/>
                        <p style={{fontWeight:'bold'}}>{companyName}</p>
                        <p style={{fontSize:15,color:"gray"}}>Mutualism Portal</p>
                        <Popup  trigger={<p className="actionText">Update logo</p>}>
                            <input type="file" id="dpInput" onChange={updateDp}/>
                            <BsUpload style={{fontSize:30,color:"gray"}}/>
                            <p style={{fontSize:12,color:'gray'}}>Select image</p>
                        </Popup>
                        <p onClick={signout} className="actionText">
                            Logout
                        </p>
                    </div>
                </div>
            </div>

            <Popup modal position="right center" open={loaderOpen} closeOnDocumentClick={false}>
                <Loader type="Grid" color="#212529" height={100} width={100}/>
            </Popup>
        </>
    )
}
export default Profile