import React, { useState } from 'react'
import './Details.css'
import Details2 from './Details2';
import Weights from './Weights';
import Geocode from "react-geocode";
import { Input } from '@material-ui/core';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

function Details({lat, lng, setLat, setLng, panTo, setSaddress, setCurrloc, flag, setFlag}) {


    const [work, setWork] = useState('');
    const [work2, setWork2] = useState('');
    const [category, setCategory] = useState('');
    const [flag2, setFlag2] = useState(false);
    


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(work);
        console.log(category);

    }

    const [prev, setPrev] = useState('');
    const handleClick = (e, value) => {
        setFlag(!flag);
        setWork(value);
        setWork2(value);
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

    const handleFlag = () => {
        console.log(1)
    }

    return (
        <div className='details'>
            
            <form onSubmit={handleSubmit}>
                <div className='coordinates'> 
                <div className='coordinates_head'>Coordinates:</div>  
                <div className='coordinates_input'>
                    <Input placeholder="Latitude" value={lat} onChange={handleLatChange} />
                    <Input placeholder="Longitude" value={lng} onChange={handleLngChange}/>
                </div>
                <button className='Submit_Button' onClick={handleCoordClick}>Submit</button>
                </div> 

                <br />
                <br />

                {flag ?
                <>
                
                    <div className="service" id="Mapping" onClick={(e) => handleClick(e, "Mapping")} key="Mapping" value="Mapping">Mapping</div>
                    <div className="service" id="Surveillance" onClick={(e) => handleClick(e, "Surveillance")} key="2" value="Surveillance">Surveillance</div>
                    <div className="service" id="Inspection" onClick={(e) => handleClick(e, "Inspection")} key="3" value="Inspection">Inspection</div>
                    <div className="service" id="Delivery" onClick={(e) => handleClick(e, "Delivery")} key="4" value="Delivery">Delivery</div>
                    <div className="service" id="Spraying" onClick={(e) => handleClick(e, "Spraying")} key="5" value="Spraying">Spraying</div>
                </> : <>
                {work && work==='Mapping' && <div className="service service_selected" id="Mapping" onClick={(e) => handleClick(e, "Mapping")} key="Mapping" value="Mapping">Mapping</div>}
                {work && work==='Surveillance' && <div className="service service_selected" id="Surveillance" onClick={(e) => handleClick(e, "Surveillance")} key="Surveillance" value="Surveillance">Surveillance</div>}
                {work && work==='Inspection' && <div className="service service_selected" id="Inspection" onClick={(e) => handleClick(e, "Inspection")} key="Inspection" value="Inspection">Inspection</div>}
                {work && work==='Delivery' && <div className="service service_selected" id="Delivery" onClick={(e) => handleClick(e, "Delivery")} key="Delivery" value="Delivery">Delivery</div>}
                {work && work==='Spraying' && <div className="service service_selected" id="Spraying" onClick={(e) => handleClick(e, "Spraying")} key="Spraying" value="Spraying">Spraying</div>}
                {/* {work && <div className="service" id={work} onClick={(e) => handleClick(e, {work})} key={work} value={work}>{work}</div>} */}
                
                
                </> 
                    
                    
                }
                {/* {work2 ? <div className='service service_selected' id={work2} onClick={(e) => handleClick(e, {work2})} key="1" value={work2}>{work2}</div>: null} */}
                {/* {work && <div className="service_selected" id={work} onClick={(e) => handleClick(e, {work})} key="1" value={work}>{work}</div>} */}

                {/* {work ?  : null } */}
                {/* <div className="service" id={work} onClick={(e) => handleClick(e, {work})} key="1" value={work}>{work}</div> */}
                {work && <Details2 work={work} />}
                <div className="cover"></div>
            </form>
        </div>
    )
}

export default Details
