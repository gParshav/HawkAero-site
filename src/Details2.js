import React from 'react'

function Details2({work}) {
    const choice = {
        "Inspection" : ["Agriculture", "Powerline", "Road & Highway", "Pipeline", "Mining", "Construction", "Telecommunication"],
        "Surveillance" : ["Pipeline Surveillance", "Road & HIghway"],
        "Mapping" : ["Mine site mapping"],
        "Spraying" : ["Agriculture spraying"],
        "Delivery" : ["Healthcare Delivery"]
    }
    return (
        <>
        <label>Select the type</label>
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

export default Details2
