import Box from '@mui/material/Box';
import ReactMapGL, { Marker, GeolocateControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillCar } from 'react-icons/ai'

const Description = ({ item }) => {
    const [center, setCenter] = useState({ lat: '', lng: '' });
    const [directions, setDirections] = useState(null);
    const [duration, setDuration] = useState(0)
    const [distance, setDistance] = useState(0)
    const [steps, setSteps] = useState([])
    //duration into minute
    let time = ''
    function convertSecondsToMinutesAndSeconds(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = Math.round(seconds % 60);
        time = minutes + " minutes and " + remainingSeconds + " sec.";
        return time
    }
    convertSecondsToMinutesAndSeconds(duration)
    //

    //distance into km
    let dist = ''
    function convertMetersToKilometers(meters) {
        var kilometers = (meters / 1000).toFixed(2);
        dist = kilometers + " kilometers"
        return dist;
    }
    convertMetersToKilometers(distance)
    const getDirection = async () => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${center.lng},${center.lat};${item.lng},${item.lat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${import.meta.env.VITE_MAP_KEY}`
            );

            // Process the response data here (e.g., store in state or display on the map)
            console.log(response.data);
            setDirections(response.data.routes[0]);
            setDuration(response.data.routes[0].duration)
            setDistance(response.data.routes[0].distance)
            setSteps(response.data.routes[0].legs[0].steps)
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
        <Box className="shadows" sx={{ height: 'auto', padding: '5px', minWidth: '97%', display: 'flex' }}>
            <div className={`p-8 bg-secondary h-[500px] w-[50%] md:w-[40%] sm:w-[40%] z-10  bottom-2`}>

                <div>
                    <p>Center your location to get direction</p>
                    {/*                    <img className='relative left-[11rem] bottom-[4.5rem] z-10 hidden lg:block' width="50" height="100" src="https://img.icons8.com/office/80/forward-arrow.png" alt="forward-arrow" />
    */}
                </div>
                <div>
                    {
                        directions && (
                            <div>
                                <div className='shadows flex bg-neutral-600 h-auto p-1 justify-center items-center flex-wrap flex-col'>
                                    <AiFillCar className='bg-white p-1 rounded-full text-3xl inline-block' />
                                    <p className=' text-white-100'>{time}</p>
                                    <p className=' text-white-100'>{dist}</p>
                                </div>
                                <div className='mt-2 grid text-white-100 shadows bg-neutral-600 h-auto p-1 flex-wrap'>
                                    <p>steps</p>
                                    <div className=' h-[250px] overflow-scroll'>
                                        {
                                            steps && (
                                                <ul className="list-decimal list-inside">
                                                    {steps.map((item, id) => (
                                                        <li key={id}>{item.name}</li>
                                                    ))}
                                                </ul>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="h-[500px] w-[100%]">
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
