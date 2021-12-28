import { Icon, IconButton, LocateIcon, SearchInput } from "evergreen-ui";
import React, { useEffect, useState } from "react";

import useGeoLocation from "./useGeoLocation";
import MapComponent from "./components/MapComponent";
import "./App.css";
import SearchLocationInput from "./components/searchAutoComplete";
import { getCurrentLocationPlaceName } from "./EndPoint";


export interface LatLng{
  lat:number,
  lng:number
}



const gMapKey = process.env.REACT_APP_AUTO_KEY;


function App() {
  const [positions, setPositions] = useState({
    latitude: 28.62,
    longitude: 77.34,
    isCurrentLocation: false,
    isSearchPlace:false,
    address:''
  });

  const location = useGeoLocation();

  const latitude = location.coordinates ? location.coordinates.lat : 0;
  const longitude = location.coordinates ? location.coordinates.lng : 0;
  const errorMessage = location.error ? location.error.message : "";

  const handelGoToCurrentLocation = () => {
    if (!errorMessage) {
      setPositions({
        ...positions,
        latitude: latitude,
        longitude: longitude,
        isCurrentLocation: true,
      });
    }
  };

  const getLatLngOnDrag=(value:LatLng)=>{
    if(value.lat && value.lng){
      setPositions({
        ...positions,
        isCurrentLocation: false,
        latitude: value.lat,
        longitude: value.lng,
      });
    }
  }

  const getSearchPlaceLatLng=(values:any)=>{
    if(values.latitude){
      setPositions({
        ...positions,
        isCurrentLocation: false,
        latitude: values.latitude,
        longitude: values.longitude,
        isSearchPlace:true
      });
    }
  }

  const getLocationName=()=>{
    getCurrentLocationPlaceName(positions.latitude,positions.longitude).then((response)=>{
      if(response.status==='OK'){
        console.log(response.results[0].formatted_address,);
        
      }
    })
  }

  useEffect(()=>{
    getLocationName();
  })

  return (
    <>
      <MapComponent positions={positions} getLatLngOnDrag={getLatLngOnDrag} />

      <IconButton
        position="fixed"
        bottom={20}
        right={20}
        zIndex={999}
        onClick={handelGoToCurrentLocation}
      >
        <Icon icon={LocateIcon} size={18} />
      </IconButton>

      <SearchLocationInput gMapKey={gMapKey} currentLocationName={positions.address} getSearchPlaceLatLng={getSearchPlaceLatLng}  />
     
    </>
  );
}

export default App;
