import { Input, TextField, Typography } from '@material-ui/core'

import React, { useCallback, useRef, useState } from 'react'
import HeroSection from './HeroSection'
import './Home.css'
import Geocode from "react-geocode";
import  Search  from './Search'
import { useLoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import Footer from './Footer';

const libraries = ["places"];
function Home() {
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

    if(loadError) return "Error loading maps"
    if(!isLoaded) return "Loading maps"
    return (
        <div className='home'>
            <div className='homeTop' >
                <div className='homeForm d-flex flex-column p-3' >
                <Typography variant ="h6" className='fill'>Fill all the requirements</Typography>
                <Search panTo={panTo} lat={lat} lng={lng} setLat={setLat} setLng={setLng} currloc={currloc} setCurrloc={setCurrloc} saddress={saddress} setFlag={setFlag}  />
                <div className=' m-3 d-flex flex-row'>
                <TextField  variant="outlined"  placeholder="Latitude" value={lat} onChange={handleLatChange} />
                <TextField variant="outlined" placeholder="Longitude" value={lng} onChange={handleLngChange}/>
                
                </div>
                <Link to={{
                        pathname: '/maps',
                        state: {
                          lat:lat,
                          lng:lng,
                          saddress:saddress,
                        }
                      }}><button className='drone p-2'>Search all Drones</button></Link>
                

                </div>
                {/* <img src="/man.jpg" /> */}
            </div>
            {/* <div className='home_center'>
                <Cards/>
            </div>
            <Footer /> */}
        </div>
    )
}

export default Home
