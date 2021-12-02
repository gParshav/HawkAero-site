import React, { useState } from 'react'
import './Details.css'
import Details2 from './Details2';
import Weights from './Weights';
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

function Details({lat, lng, setLat, setLng, panTo, setSaddress, setCurrloc, flag, setFlag}) {


    const [work, setWork] = useState('');
    const [category, setCategory] = useState('');
    
    


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
        const lat2=lat.toString();
        const lng2=lng.toString();
        Geocode.fromLatLng(lat2, lng2).then(
          response => {
            const address = response.results[0].formatted_address;
            setSaddress(address);
            console.log(address);
          },
          error => {
            console.error(error);
          }
        );
    }

    const handleLatChange = (e) => {
        setCurrloc(true)
        setLat(e.target.value)
    }

    const handleLngChange = (e) => {
        setCurrloc(true)
        setLng(e.target.value)
    }

    return (
        <div className='details'>
            
            <form onSubmit={handleSubmit}>
                {/* <br/>
                <br/>
                <br/>
                <br />
                <br />
                <br /> */}
                
                <div className='coordinates'> 
                <div className='coordinates_head'>Coordinates:</div>  
                <div className='coordinates_input'>
                    <input placeholder="Latitude" value={lat} onChange={handleLatChange} />
                    <input placeholder="Longitude" value={lng} onChange={handleLngChange}/>
                    <button onClick={handleCoordClick}>Submit</button>
                </div>
                </div> 

                <br />
                <br />
                {flag &&
                <>
                {/* <label>Select the service</label> */}
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
