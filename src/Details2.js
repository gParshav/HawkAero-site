import React, { useState } from 'react'
import Weights from './Weights';

function Details2({work, saddress}) {
    const choices = {
        "Inspection" : ["Agriculture", "Powerline", "Road & Highway", "Pipeline", "Mining", "Construction", "Telecommunication"],
        "Surveillance" : ["Pipeline Surveillance", "Road & HIghway"],
        "Mapping" : ["Mine site mapping"],
        "Spraying" : ["Agriculture spraying"],
        "Delivery" : ["Healthcare Delivery"]
    }



    const [type, setType] = useState('');
    const [prev, setPrev] = useState('');
    const [flag, setFlag] = useState(true);
    const handleClick = (e, value) => {
        setType(value);
        setFlag(!flag);
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
        {/* <label className="label">Select the type</label> */}
        <br />
                {/* {!flag && choices[work].map((choice, id) => {
                    {choice=={type} &&
                
                      
                        <div className="service" id={id} onClick={(e) => handleClick(e, choice)} key={id} value={choice}>{choice}</div>
                        
                   }
                }) } */}
                {choices[work].map((choice, id) => {
                    return (
                        <div className="service" id={id} onClick={(e) => handleClick(e, choice)} key={id} value={choice}>{choice}</div>
                   )
                }) }
                    
                
                 
                
                {type && <Weights work={work} type={type} saddress={saddress}/>}
        </>
    )
}

{/* <option key={e} value={e}>{e}</option> */}
export default Details2
