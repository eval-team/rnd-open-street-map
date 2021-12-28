import { useState, useEffect } from "react";

export interface errorInterface{
    code:number,
    message:string
}
export interface demoInter{
    error:errorInterface
}
export interface coordinatesInter{
    lat:number,
    lng:number
}
export interface setLocationInterface{
    loaded:boolean,
    coordinates?:coordinatesInter,
    error?:errorInterface
}



const useGeoLocation = () => {
    const [location, setLocation] = useState<setLocationInterface>({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
        error:{code:0,message:""}
    });

    const onSuccess = (location:any) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error:any) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;