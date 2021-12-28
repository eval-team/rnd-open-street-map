import axios from "axios";
const autoKey = process.env.REACT_APP_LOCATION_NAME;

export const getCurrentLocationPlaceName = async (lat:number,lng:number) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${autoKey}`);
    const { data } = response;
    return data;
  };
  