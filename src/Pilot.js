import { Typography } from '@material-ui/core'
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios'
import React, { useCallback, useRef, useState } from 'react'
import './Pilot.css'
import Search from './Search';
import Geocode from "react-geocode";

const libraries = ["places"];
function Pilot() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    
})

const [markers, setMarkers] = useState([]);
const [selected, setSelected] = useState(null);
const [lat, setLat] = useState(0);
const [lng, setLng] = useState(0);
const [currloc, setCurrloc] = useState(false);
const [saddress, setSaddress] = useState('');
const [flag, setFlag] = useState(false);

// useEffect(() => {
//   console.log(markers)
// }, []); // Only re-subscribe if props.friend.id changes

const onMapClick = useCallback((e) => {

    // console.log(e.latLng)
    setCurrloc(true);
    setMarkers([
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
        // draggable: true,
      },
    ]);
    
    const lat2=e.latLng.lat().toString();
    const lng2=e.latLng.lng().toString();
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
    setLat(e.latLng.lat());
    setLng(e.latLng.lng());

    // console.log(lat, lng)
  }, []);


const mapRef = useRef(); //We use ref when we dont want the state to be re-rendered, the state will be retained.
const onMapLoad = useCallback((map) => {
mapRef.current = map;
}, []);

const panTo = useCallback(({lat, lng}) => {
  // console.log(lat, lng)
  setMarkers([
    {
      lat: lat,
      lng: lng,
      time: new Date(),
    },
  ]);
  setLat(lat);
  setLng(lng);

  // console.log(mapRef.current);
  mapRef.current.panTo({lat, lng})
  mapRef.current.setZoom(14)
  }, []);

  const handleLatChange = (e) => {
    setCurrloc(true)
    setLat(e.target.value)
}

const handleLngChange = (e) => {
    setCurrloc(true)
    setLng(e.target.value)
}


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    if(loadError) return "Error loading maps"
if(!isLoaded) return "Loading maps"

    const handleSubmit = async (e) => {
      console.log(saddress)
        try{
        //   console.log(1);
          const res = await axios.post("/pilots/register", {
            address:address,
            name:name,
            email:email
          });
          console.log(res);
          
        }catch(err){
          console.log(err);
        }
        window.alert("Pilot registered!!");
        // window.location.reload();
    }

    return (
      <div className='d-flex flex-row pilotDiv'>
        <div className='d-flex flex-column pilotdiv' >
        <Typography variant ="h6" className='fill mt-2'>Register UAV pilot</Typography>
            <input type="text" required placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} className='fly_duration m-5'/>
            {/* <Search panTo={panTo} lat={lat} lng={lng} setLat={setLat} setLng={setLng} currloc={currloc} setCurrloc={setCurrloc} saddress={saddress} setFlag={setFlag} setSaddress={setSaddress} /> */}
            <input type="text" required placeholder="Enter name" onChange={(e) => setName(e.target.value)} className='fly_duration m-5'/>
            <input type="text" required placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className='fly_duration m-5'/>
            <button type="submit" onClick={handleSubmit} className='finalSubmit m-2' >SUBMIT</button>
        </div>
        <img className="PilotImg" src='./img-3.jpg' />
        </div>
    )
}

export default Pilot
