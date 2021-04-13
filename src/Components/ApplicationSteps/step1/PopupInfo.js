import React from 'react';
const PopupInfo = (props)=>{
    if(props.info=="business registration"){
        return(
            <>
                <p style={{fontWeight:300,fontSize:12,marginLeft:10}}>You business must be registered with CIPC. For more info <a href="http://www.cipc.co.za/" target="_blank" style={{color:'#007A4D'}}>click here</a></p>
            </>
        )
    }
    else if(props.info == "sars registration"){
        return(
            <>
                <p style={{fontWeight:300,fontSize:12,marginLeft:10}}>You business must be registered with SARS. For more info <a href="https://www.sars.gov.za/Pages/default.aspx" target="_blank" style={{color:'#007A4D'}}>click here</a></p>
            </>
        )
    }
    else{
        return(
            <>
                <p style={{fontWeight:300,fontSize:12,marginLeft:10,marginTop:10}}>We'll be reaching out to more areas as we grow. We currently offer funding to businesses in Soweto and Khayelitcha.</p>
            </>
        )
    }


}   
export default PopupInfo