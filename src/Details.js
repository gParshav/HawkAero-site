import React, { useState } from 'react'
import './Details.css'
import Details2 from './Details2';
import Weights from './Weights';

function Details({lat, lng, setLat, setLng, panTo}) {


    const [work, setWork] = useState('');
    const [category, setCategory] = useState('');
    const [flag, setFlag] = useState(false);
    


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(work);
        console.log(category);

    }

    const [prev, setPrev] = useState('');
    const handleClick = (e, value) => {
        setWork(value);
        if(prev){
            document.getElementById(prev).classList.remove("service_selected");
            setPrev('');
        }
        setPrev(e.target.id);
        document.getElementById(e.target.id).classList.add("service_selected");
    }

    const handleCoordClick = (e) => {
        lat=parseFloat(lat);
        lng=parseFloat(lng);
        setFlag(true);
        panTo({lat, lng})
    }

    return (
        <div className='details'>
            <h1>Fill all the requirements</h1>
            <form onSubmit={handleSubmit}>
                <br/>
                <br/>
                <br/>
                <br />
                <br />
                <br />
                <label>Coordinates:</label>
                <div className='coordinates'>   
                    <input placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
                    <input placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)}/>
                    <button onClick={handleCoordClick}>Submit</button>
                </div> 

                <br />
                <br />
                {flag &&
                <>
                <label>Select the service</label>
                <br />
                
                    <div className="service" id="Mapping" onClick={(e) => handleClick(e, "Mapping")} key="1" value="Mapping">Mapping</div>
                    <div className="service" id="Surveillance" onClick={(e) => handleClick(e, "Surveillance")} key="2" value="Surveillance">Surveillance</div>
                    <div className="service" id="Inspection" onClick={(e) => handleClick(e, "Inspection")} key="3" value="Inspection">Inspection</div>
                    <div className="service" id="Delivery" onClick={(e) => handleClick(e, "Delivery")} key="4" value="Delivery">Delivery</div>
                    <div className="service" id="Spraying" onClick={(e) => handleClick(e, "Spraying")} key="5" value="Spraying">Spraying</div>
                    </>
                 }
                {work && <Details2 work={work} />}
                <div className="cover"></div>
            </form>
        </div>
    )
}

export default Details
