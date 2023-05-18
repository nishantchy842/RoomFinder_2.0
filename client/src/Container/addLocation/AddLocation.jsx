import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';
import { UPDATE_LOCATION} from '../../Redux/Reducer/roomSlice';
import { useDispatch, useSelector } from 'react-redux'

const AddLocation = () => {
  const { lat, lng } = useSelector(state => state.room.location)
  const dispatch = useDispatch()

  const mapRef = useRef();

  useEffect(() => {
    if (!lng && !lat) {
      fetch('https://ipapi.co/2403:3800:3233:1213:3d58:8a5b:acd3:add1/json/')
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
    <div className='h-[60vh]'>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAP_KEY}
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
    </div>
  );
};

export default AddLocation;