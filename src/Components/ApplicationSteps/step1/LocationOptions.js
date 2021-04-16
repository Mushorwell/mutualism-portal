import React from 'react';
const LocationOptions = (props)=>{

    const handleLocationOption = (event) => {
        let chosen = event.target.id;
        (chosen==='soweto')?props.selectLocation(chosen):(chosen==='khayelitsha')?props.selectLocation(chosen):props.selectLocation('');
    }

    return(
        <div className="application-form inline-input-elements">
            <button className={`card1`} id="soweto" onClick={handleLocationOption} style={props.chosenLocation==='soweto'?{border: "solid 1px #007A4D", background:"#007A4D", color:"#ffffff"}:{border: "none"}}>
                <h6 className="step-heading location-heading" id="soweto">Soweto</h6>
                <p className="small step-heading" id="soweto">Select this option if business is based in Soweto.</p>
                <div className="go-corner" id="soweto"></div>
            </button>
            <button className={`card1`} id="khayelitsha" onClick={handleLocationOption} style={props.chosenLocation==='khayelitsha'?{border: "solid 1px #007A4D", background:"#007A4D", color  :"#ffffff"}:{border: "none"}}>
                <h6 className="step-heading location-heading" id="khayelitsha">Khayelitsha</h6>
                <p className="small step-heading" id="khayelitsha">Select this option if business is based in Khayelitsha.</p>
                <div className="go-corner" id="khayelitsha"></div>
            </button>
        </div>
    )
}
export default LocationOptions