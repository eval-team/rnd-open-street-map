import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../App.css";
import useGeoLocation from "../useGeoLocation";
import LocationMarker from "./LocationMarker";

// import RoutineMachine from './Routing';

interface Props {
  positions: any;
  getLatLngOnDrag:Function
}

function MapComponent({ positions,getLatLngOnDrag }: Props) {
  const location = useGeoLocation();

  return (
    <>
      {!location.loaded ? (
        "loading..."
      ) : (
        <MapContainer
          center={[positions.latitude, positions.longitude]}
          zoom={100}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker positions={positions} getLatLngOnDrag={getLatLngOnDrag} />

          {/* <RoutineMachine /> */}
        </MapContainer>
      )}
    </>
  );
}

export default MapComponent;
