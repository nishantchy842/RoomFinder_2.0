import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useDispatch  } from 'react-redux'
import { UPDATE_LOCATION } from '../../Redux/Reducer/roomSlice';

const Geocoder = () => {
  const dispatch = useDispatch()

  const ctrl = new MapBoxGeocoder({
    accessToken: 'pk.eyJ1IjoibmlzaGFudDg0MiIsImEiOiJjbGgyemNjMm8wNjE2M3BxZzA2NnpxNXZiIn0.AA83bqvjV5J5V9NGgljf5g',
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    console.log(e.result.geometry.coordinates)
   
    dispatch(UPDATE_LOCATION({ lng: coords[0], lat: coords[1] }))

  });
  return null;
};

export default Geocoder;