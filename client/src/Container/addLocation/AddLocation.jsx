import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
// import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import Geocoder from './Geocoder';
import Layout from '../../Component/Layout/Layout';

const AddLocation = () => {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  const mapRef = useRef();

  useEffect(() => {
    if (!lng && !lat) {
      fetch('https://ipapi.co/json/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });

          setLat(data.latitude)
          setLng(data.longitude)
          // dispatch({
          //   type: 'UPDATE_LOCATION',
          //   payload: { lng: data.longitude, lat: data.latitude },
          // });
          console.log(data)
        });
    }
  }, []);


  return (
    <Layout>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken='pk.eyJ1IjoibmlzaGFudDg0MiIsImEiOiJjbGgyemNjMm8wNjE2M3BxZzA2NnpxNXZiIn0.AA83bqvjV5J5V9NGgljf5g'
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) => {
            console.log(e.lngLat.lat)
            console.log(e.lngLat.lng)
          }}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => console.log(e)}
        />
        <Geocoder />
      </ReactMapGL>
    </Layout>
  );
};

export default AddLocation;