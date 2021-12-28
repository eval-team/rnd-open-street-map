import L from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useIsMount } from "../hooks/useIsMount";
import icon from "../img/marker.png";

interface Props {
  positions: any;
  getLatLngOnDrag: Function;
}

const LocationMarker = ({ positions, getLatLngOnDrag }: Props) => {
  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const map = useMapEvents({
    locationfound(e: any) {
      map.flyTo(e.latlng, map.getZoom());
    },
    dragend: (e: any) => {
      setPosition(e.target.getCenter());
    },
  });

  const [position, setPosition] = useState(map.getCenter());
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      if (positions.isCurrentLocation) {
        map.locate();
      }
    }
  });

  useEffect(() => {
    if (!isMount) {
      if (getLatLngOnDrag) {
        getLatLngOnDrag(position);
      }
    }
  }, [position]);

  useEffect(()=>{
    if(positions.isSearchPlace){
      // @ts-ignore
    map.flyTo({lat:positions.latitude,lng:positions.longitude},map.getZoom());
    }
    
  },[positions.isSearchPlace,positions.latitude,positions.longitude])

  return (
    <Marker
      icon={markerIcon}
      position={[positions.latitude, positions.longitude]}
    ></Marker>
  );
};
export default LocationMarker;
