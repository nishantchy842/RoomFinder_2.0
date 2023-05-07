import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';
import { UPDATE_LOCATION } from '../../Redux/Reducer/roomSlice';
import { useDispatch, useSelector } from 'react-redux'
import AddDetails from '../addDetails/AddDetails';

const AddLocation = () => {
  const { lat, lng } = useSelector(state => state.room.location)
  const dispatch = useDispatch()

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
          dispatch(UPDATE_LOCATION({ lng: data.longitude, lat: data.latitude }))
        });
    }
  }, []);


  return (
    <div className='h-[80vh]'>
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
            dispatch(UPDATE_LOCATION({ lng: e.lngLat.lng, lat: e.lngLat.lat }))

          }}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch(UPDATE_LOCATION({ lng: e.coords.longitude, lat: e.coords.latitude }))
          }
        />
        <Geocoder />
      </ReactMapGL>
      <AddDetails />
    </div>
  );
};

export default AddLocation;