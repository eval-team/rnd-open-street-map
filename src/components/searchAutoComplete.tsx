import React, { useState, useEffect, useRef } from 'react';
import { SearchInput } from 'evergreen-ui';

let autoComplete: any;

const loadScript = (url: string, callback: Function) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  //@ts-ignore
  if (script.readyState) {
    //@ts-ignore
    script.onreadystatechange = function () {
      //@ts-ignore
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        //@ts-ignore
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;

  document.getElementsByTagName('head')[0].appendChild(script);
};

function handleScriptLoad(updateQuery: any, autoCompleteRef: any) {
  // assign autoComplete with Google maps place one time
  //@ts-ignore
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: 'ind' } }
  );
  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery: any) {
  const addressObject = autoComplete.getPlace(); // get place from google api

  const query = addressObject.formatted_address;
  updateQuery(query);
}
interface Props {
  gMapKey?: string;
  getSearchPlaceLatLng?: Function;
  currentLocationName?:string
}
const SearchLocationInput = ({ gMapKey, getSearchPlaceLatLng,currentLocationName }: Props) => {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);
  let selectPlace: any;
  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0,
    place:''
  });

  if (autoComplete) {
    selectPlace = autoComplete.getPlace();    
  }

  useEffect(() => {
    if (selectPlace) {
      const latitude = selectPlace.geometry.location.lat();
      const longitude = selectPlace.geometry.location.lng();
      setLatLng({
        lat: latitude,
        lng: longitude,
        place:query
      });
    }
  }, [selectPlace]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${gMapKey}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, [autoCompleteRef]);

  useEffect(() => {
    if (latLng.lat > 0) {
      if(getSearchPlaceLatLng){
        getSearchPlaceLatLng({ latitude: latLng.lat, longitude: latLng.lng,place:latLng.place })
      }
    }
  }, [latLng]);

  useEffect(()=>{
    if(currentLocationName){
      setQuery(currentLocationName)
    }
  },[currentLocationName])

  return (
    <div>
      <SearchInput
        ref={autoCompleteRef}
        onChange={(event: any) => setQuery(event.target.value)}
        position="absolute" 
        top={20} 
        left="40%"
        height={40}  
        zIndex={999} 
        placeholder="Search your place..."
        value={query}
      />
    </div>
  );
};
export default SearchLocationInput;
