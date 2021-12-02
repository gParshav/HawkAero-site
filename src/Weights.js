import React, { useState } from 'react'
import './Weights.css'

function Weights({work}) {
    const choices = {
        "Inspection" : ["Less than 2kg", "Less than 25kg", "Less than 150kg"],
        "Surveillance" : ["Less than 2kg", "Less than 25kg", "Less than 150kg"],
        "Mapping" : ["Less than 2kg", "Less than 25kg", "Less than 150kg"],
        "Spraying" : ["Less than 25kg", "Less than 150kg"],
        "Delivery" : [ "Less than 25kg", "Less than 150kg"]
    }

    const [duration, setDuration] = useState('');
    const [weight, setWeight] = useState('');
    const [prev, setPrev] = useState('');

    
    const handleClick = (e, value) => {
        setWeight(value);
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
        {/* <label>Select Category</label> */}
        <br />
            {choices[work].map((choice) => {
                return (
                    <div className="service" id={choice} onClick={(e) => handleClick(e, choice)} key="1" value={choice}>{choice}</div>
                )
            })}
            {weight && 
                    <div className='duration'>
                        <input type="text"
                                required
                                value={duration}
                                placeholder="Enter Flying Duration"
                                onChange={(e) => setDuration(e.target.value)} 
                                className='fly_duration'

                                />
                        <button type="submit" >Submit</button>
                        </div>
                   
            }
        </>
    )
}

export default Weights
