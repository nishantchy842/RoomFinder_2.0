import Box from '@mui/material/Box';
import ReactMapGL, { Marker, GeolocateControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Description = ({ item }) => {
    const [center, setCenter] = useState({ lat: '', lng: '' });
    const [directions, setDirections] = useState(null);

    const getDirection = async () => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${center.lng},${center.lat};${item.lng},${item.lat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${import.meta.env.VITE_MAP_KEY}`
            );

            // Process the response data here (e.g., store in state or display on the map)
            console.log(response.data);
            setDirections(response.data.routes[0]);
        } catch (error) {
            console.error('Error retrieving directions:', error);
        }
    };
    useEffect(() => {
        setCenter({ lat: item.lat, lng: item.lng });
    }, [item]);
    
    useEffect(() => {
        if (center.lat !== '' && center.lng !== '') {
            getDirection();
        }
    }, [center]);




    return (
        <Box className="shadows" sx={{ height: 'auto', padding: '5px', minWidth: '100%' }}>
            <div className="h-[400px] w-[100%]">
                <ReactMapGL
                    mapboxAccessToken={import.meta.env.VITE_MAP_KEY}
                    initialViewState={{
                        latitude: item?.lat,
                        longitude: item?.lng,
                        zoom: 15,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"

                >
                    <Marker latitude={item?.lat} longitude={item?.lng} />
                    <GeolocateControl
                        position="top-left"
                        trackUserLocation
                        onGeolocate={(e) =>
                            setCenter({ lng: e.coords.longitude, lat: e.coords.latitude })
                        }
                    />
                    {directions && (
                        <Source type="geojson" data={directions.geometry}>
                            <Layer
                                id="route"
                                type="line"
                                paint={{ 'line-color': '#0074D9', 'line-width': 4 }}
                            />
                        </Source>
                    )}
                </ReactMapGL>
            </div>
        </Box>
    );
};

Description.propTypes = {
    item: PropTypes.any.isRequired,
};

export default Description;
