import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Geocoder from "./Geocoder";
import { UPDATE_DETAILS, UPDATE_LOCATION } from "../../Redux/Reducer/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../Utils/Style";
import style from "./location.module.css";

const AddLocation = () => {
  const { lat, lng } = useSelector((state) => state.room.location);
  const { address, place } = useSelector((state) => state.room.details);
  const dispatch = useDispatch();

  const mapRef = useRef();

  useEffect(() => {
    if (!lng && !lat) {
      fetch("https://ipapi.co/2403:3800:3233:1213:3d58:8a5b:acd3:add1/json/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch(
            UPDATE_LOCATION({ lng: data.longitude, lat: data.latitude })
          );
        });
    }
  }, []);

  useEffect(() => {
    if (lng && lat) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
        import.meta.env.VITE_MAP_KEY
      }`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data.features[0].properties.address) {
            dispatch(
              UPDATE_DETAILS({
                address: data.features[0].place_name,
                place: data.features[0].text,
              })
            );
          } else {
            dispatch(
              UPDATE_DETAILS({
                address: data.features[0].place_name,
                place: data.features[0].properties.address,
              })
            );
          }
        });
    }
  }, [lng, lat]);
  return (
    <div className={style.mapContainer}>
      <div
        className={`${styles.bold} flex justify-center gap-x-2 items-center`}
      >
        <p className={`${styles.bold} location_style`}> Your location:</p>
        <p> {address}</p>
      </div>
      <div className="flex justify-center gap-x-2 items-center">
        <p className={`${styles.bold} location_style`}>City: </p>
        <p className={`${styles.bold}`}>{place}</p>
      </div>
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
            dispatch(UPDATE_LOCATION({ lng: e.lngLat.lng, lat: e.lngLat.lat }));
          }}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch(
              UPDATE_LOCATION({
                lng: e.coords.longitude,
                lat: e.coords.latitude,
              })
            )
          }
        />
        <Geocoder />
      </ReactMapGL>
    </div>
  );
};

export default AddLocation;
