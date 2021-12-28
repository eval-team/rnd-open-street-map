import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";


interface Props {
  provider: any;
  showMarker: boolean;
  showPopup: boolean;
  popupFormat: Function;
  maxMarkers: number;
  retainZoomLevel: boolean;
  animateZoom: boolean;
  autoClose: boolean;
  searchLabel: string;
  keepResult: boolean;
}

const SearchControl = ({provider,...props}: Props) => {
  const map = useMap();
  // @ts-ignore

  useEffect(() => {
    // @ts-ignore

    const searchControl = new GeoSearchControl({
      provider: provider,
      ...props,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [props]);

  return null;
};
export default SearchControl;
