import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import { Avatar, Paper, Tooltip } from '@mui/material';
import useRooms from "../../hooks/useRooms"
import { useEffect, useRef, useState } from 'react';
import './cluster.css'
import PopupRoom from './PopUpRoom';
import { AiFillCloseCircle } from 'react-icons/ai';
import Geocoder from '../addLocation/Geocoder';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});


const ClusterMap = () => {
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const data = useRooms()
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const points = data.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        amenities: room.amenities,
        address: room.address,
        images: room.img_collection,
        uPhoto: room.uPhoto,
        uName: room.uName,
        uPhone: room.uPhone,
        uEmail: room.uEmail,
        appliedCandidates: room.appliedCandidates,
        createdAt: room.createdAt
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
  }, [data]);


  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <div className='cluter_map h-[80vh] w-[80vw]'>
      <ReactMapGL
        initialViewState={{ latitude: 27.678011981717034, longitude: 85.307303340504 }}
        mapboxAccessToken={import.meta.env.VITE_MAP_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        <Geocoder />
        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties;
          const [longitude, latitude] = cluster.geometry.coordinates;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className="cluster-marker hover:bg-violet-700"
                  style={{
                    width: `${10 + (point_count / points.length) * 20}px`,
                    height: `${10 + (point_count / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1,
                    });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`room-${cluster.properties.roomId}`}
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={cluster.properties.uName}>
                <Avatar
                  src={`${import.meta.env.VITE_APP_URL}/uploads/${cluster.properties.uPhoto}`}
                  component={Paper}
                  elevation={2}
                  onClick={() => setPopupInfo(cluster.properties)}
                />
              </Tooltip>
            </Marker>
          );
        })}
        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth="auto"
            closeOnClick={false}
            focusAfterOpen={false}
          // onClose={() => setPopupInfo(null)}
          >
            <div onClick={() => setPopupInfo(null)}>
              <AiFillCloseCircle className="h-10 w-10 absolute -top-0.5 -right-1 z-10 cursor-pointer text-red-500" />
            </div>
            <PopupRoom {...{ popupInfo }} />
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default ClusterMap
