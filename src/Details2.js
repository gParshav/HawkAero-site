import React, { useState } from 'react'
import Weights from './Weights';

function Details2({work}) {
    const choices = {
        "Inspection" : ["Agriculture", "Powerline", "Road & Highway", "Pipeline", "Mining", "Construction", "Telecommunication"],
        "Surveillance" : ["Pipeline Surveillance", "Road & HIghway"],
        "Mapping" : ["Mine site mapping"],
        "Spraying" : ["Agriculture spraying"],
        "Delivery" : ["Healthcare Delivery"]
    }



    const [type, setType] = useState('');
    const [prev, setPrev] = useState('');
    const handleClick = (e, value) => {
        setType(value);
        if(prev){
            document.getElementById(prev).classList.remove("service_selected");
            setPrev('');
        }
        setPrev(e.target.id);
        document.getElementById(e.target.id).classList.add("service_selected");
    }
    return (
        <>
        <br />
        <label className="label">Select the type</label>
        <br />
       
                {choices[work].map((choice) => {
                    return (
                        <div className="service" id={choice} onClick={(e) => handleClick(e, choice)} key="1" value={choice}>{choice}</div>
                   )
                })}
                 
                
                {type && <Weights work={work} />}
        </>
    )
}

{/* <option key={e} value={e}>{e}</option> */}
export default Details2
