import React from 'react'

function Weights({work}) {
    const choice = {
        "Inspection" : ["Less than 2kg", "Less than 25kg", "Less than 150kg"],
        "Surveillance" : ["Less than 2kg", "Less than 25kg", "Less than 150kg"],
        "Mapping" : ["Less than 2kg", "Less than 25kg", "Less than 150kg"],
        "Spraying" : ["Less than 25kg", "Less than 150kg"],
        "Delivery" : [ "Less than 25kg", "Less than 150kg"]
    }
    return (
        <>
        <label>Select Category</label>
        <select

                       type="text"
                       required
                
                >
                {choice[work].map((e) => {
                    return (
                        <option value={e}>{e}</option>
                   )
                })}
                 
                </select>
        </>
    )
}

export default Weights
