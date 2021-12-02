import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Maps.css'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import {add, format, formatRelative} from "date-fns"
import  "@reach/combobox/styles.css"
import mapStyles from './mapStyles'
import Details from './Details';
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();
require('dotenv').config();

const libraries = ["places"];
const mediaQuery = window.matchMedia("(max-width:900px)")

// `@media(max-width:900px)`: {
  //   height: "20vh",
  //   width: "100%",
  // },
  
    // return (
    //   
    // )
// const mapContainerStyle = () => {
  
//   if(mediaQuery.matches){
//     return {
//       height: "90vh",
//       width: "100%",
//     }
//   }

//   else{
//     return {
//       height: "10vh",
//       width: "100%",
//     }
//   }
  
// };

const mapContainerStyle = {
  height: "90vh",
  width: "100%",
};

const options = {
// styles: mapStyles,
disableDefaultUI: true,
zoomControl: true,
};

const center = {
lat: 20.5937,
lng: 78.9629,
};
function Maps() {
  // let mapContainerStyle={
  //   height: "90vh",
  //      width: "100%",
  // };
  // useEffect(() => {
  //   console.log(1)
  //   if(window.innerWidth<900){
  //     mapContainerStyle = {
  //      height: "10vh",
  //      width: "100%",
  //    };
  //  }
  //  else{
  //     mapContainerStyle = {
  //      height: "90vh",
  //      width: "100%",
  //    };
  //  }
  // }, [window.innerWidth])
  

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



    if(loadError) return "Error loading maps"
    if(!isLoaded) return "Loading maps"
    
    

    return (
      <>
        
        <div className='maps'>
        
            
            <div className='first'>
            <h1 className='fill'>Fill all the requirements</h1>
            <Current panTo={panTo} setCurrloc={setCurrloc} setSaddress={setSaddress} setFlag={setFlag} />
            <Search panTo={panTo} lat={lat} lng={lng} setLat={setLat} setLng={setLng} currloc={currloc} setCurrloc={setCurrloc} saddress={saddress} setFlag={setFlag}/>
            <Details lat={lat} lng={lng} setLat={setLat} setLng={setLng} panTo={panTo} setSaddress={setSaddress} setCurrloc={setCurrloc} flag={flag} setFlag={setFlag} />
            
            </div>
            
            <div className='second'>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                // className="mapSize"
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
                
            >
            <Locate panTo={panTo} lat={lat} lng={lng} setCurrloc={setCurrloc} setSaddress={setSaddress} setLat={setLat} setLng={setLng} setFlag={setFlag}/>
            {markers.map((marker) => (
          <Marker 
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }} 
          icon={{
            //   url: `/images.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
              
            }}
            onClick={() => {
                setSelected(marker);
                
            }}
            draggable
            // onDrag={() => console.log(1)}
            // onDragStart={() => console.log(1)}
            onDragEnd={onMapClick}
            // onDrag={onMapClick}
          
          />
          
            ))}
            

            {selected ? (
                <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
                    <div>
                        <h2>Spotted</h2>
                        <p>Spotted {formatRelative(selected.time, new Date())}</p>
                    </div>
                </InfoWindow>
            ) : null}
            </GoogleMap>
            </div>
        </div>
        </>
    )
}

function Locate({ panTo,setCurrloc, lat, lng ,setSaddress, setLat, setLng , setFlag}) {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setFlag(true);
        const lat2=position.coords.latitude.toString();
    const lng2=position.coords.longitude.toString();
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
      },
      () => null
    );
    
    

    setCurrloc(true);

  }

  return (
    <button
      className="locate"
      onClick={handleClick}
    >
      <img src="/download.png" alt="compass" />
    </button>
  );
}

function Current({ panTo, setCurrloc, setSaddress, setFlag }) {

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setFlag(true);
        const lat2=position.coords.latitude.toString();
        const lng2=position.coords.longitude.toString();
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
      },
      () => null
    );
        
    setCurrloc(true)
  }

  return (
    <p
      className="click"
      onClick={handleClick}
    >
      Use your current location
    </p>
  );
}

function Search({panTo, lat, lng, setLat, setLng, currloc, setCurrloc, saddress, setFlag}) {

    const handleInput = (e) => {
      setCurrloc(false)
        setValue(e.target.value);
        
      };
    
      

      const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
      }


    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });

    useEffect(() => {
      setValue(saddress, false);
    }, [saddress])

    if(!value && !currloc){
      setLat(0);
      setLng(0);
    }
    


    return (
        <div className="search">
        
          <Combobox  onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try{
              setCurrloc(false);
              setFlag(true);
              const results = await getGeocode({address});
              const {lat,lng} = await getLatLng(results[0]);
              panTo({lat,lng})
              console.log(lat, lng)
            } catch(error) {
              console.log(error)
            }
          }}>  
            <ComboboxInput
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder="Search your location"
            />
            <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
          </Combobox>
        </div>
      );
}

function Location(){
  return (
    <div className='coordinates2'>             
      <input placeholder="0" />
      <input placeholder="0" />
    </div>
  
  )
}
export default Maps
