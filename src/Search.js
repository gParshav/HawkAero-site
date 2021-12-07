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
import {SearchIcon} from '@heroicons/react/solid'

function Search({panTo, lat, lng, setLat, setLng, currloc, setCurrloc, saddress, setFlag}) {

    const handleInput = (e) => {
        setCurrloc(false)
        setValue(e.target.value);
        
        
      };
    
      

      const handleSelect = async (address) => {
        setValue(address, false);
        // setSaddress(address);
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
          <div >

            <ComboboxInput
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder="Search your location"
            />
            {/* <SearchIcon className="icon"/> */}
          </div>
            
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

export default Search