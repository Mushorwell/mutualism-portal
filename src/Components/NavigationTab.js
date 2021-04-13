import React from 'react';
import { Link } from "react-router-dom";
const NavigationTab = (props)=>{
    // portal navigation configurations settings
    if(props.page == "signIn"){
        return <><p className="active" style={{marginLeft:0}}>Sign In</p> <Link to={"/signUp"}><p>Sign Up</p></Link></>;
    }else if(props.page == "signUp"){
        return <><Link to={"/"}><p style={{marginLeft:0}}>Sign In</p></Link> <p className="active">Sign Up</p></>;
    }else if(props.page == "passwordReset"){
        return <><Link to={"/"}><p style={{marginLeft:0}}>Back to sign in</p></Link></>;
    }else if(props.page == "main"){
        return <><p className="active" style={{marginLeft:0}}>{props.isPartner? "Financials":"Application"}</p> <Link to={"/consulting"}><p>Consulting</p></Link>  <Link to={"/organise"}><p>Organise</p></Link></>;
    }else if(props.page == "consulting"){
        return <><Link to={"/"}><p style={{marginLeft:0}}>{props.isPartner? "Financials":"Application"}</p></Link> <p className="active">Consulting</p> <Link to={"organise"}><p>Organise</p></Link></>;
    }else if(props.page == "organise"){
        return <><Link to={"/"}><p style={{marginLeft:0}}>{props.isPartner? "Financials":"Application"}</p></Link> <Link to={"consulting"}><p>Consulting</p></Link> <p className={"active"}>Organise</p></>;
    }else if(props.page == "profile"){
        return <><Link to={"/"}><p style={{marginLeft:0}}>{props.isPartner? "Financials":"Application"}</p></Link> <Link to={"consulting"}><p>Consulting</p></Link> <Link to={"organise"}><p>Organise</p></Link></>;
    }else{
        return '';
    }
}
export default NavigationTab