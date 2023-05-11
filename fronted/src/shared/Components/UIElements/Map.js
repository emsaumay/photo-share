import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import "./Map.css"

const Map = ({location, zoom}) => {

    const [data, setData] = useState(null);
    const mapContainerRef = useRef(null);


    useEffect(() => {
        const APIkey = 'pk.eyJ1Ijoib25lcnVkZXpvbWJpZSIsImEiOiJja25vcGY1dXIwcWo5Mm9sYXp0NTk0czM0In0.PucshkWcR6UkRw7BlPBG0A';
        const API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${APIkey}&limit=1`
        const fetchData = async () => {
            const response = await fetch(`${API_URL}`);
            const json = await response.json();
            setData(json);
            // console.log("Ref" + mapContainerRef.current)

            getMap(json)
        };
        fetchData();


        const getMap = data => {
            // console.log("Ref" + mapContainerRef.current)
            mapboxgl.accessToken = APIkey;
            const locationCords = data.features[0].center
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: locationCords,
                zoom: zoom,
            });
            const el = document.createElement('div');
            el.className = 'marker';
            new mapboxgl.Marker().setLngLat(locationCords).addTo(map);
      
            // Clean up the map instance when the component is unmounted
            // return () => map.remove();
        }
        
        
    }, [location, zoom]);
    
    if (data == null) {
        console.log("Loading")
        return  <div ref={mapContainerRef} className="map"><h2 className='loading-text'>Loading...</h2></div>
    }
    
        // return <h2>{data.features[0].center}</h2>
        // console.log(data)
    else{   
    return <div ref={mapContainerRef} className="map" />;
    }
    
};

export default Map;