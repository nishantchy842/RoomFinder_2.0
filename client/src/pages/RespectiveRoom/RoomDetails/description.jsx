import Box from '@mui/material/Box';
import ReactMapGL, {
    Marker,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from "prop-types";

const Description = ({ item }) => {
    return (
        <Box className="shadows" sx={{ height: 'auto', padding: '5px', minWidth: '100%'}} >
            <div className='h-[400px] w-[100%] '>
                <ReactMapGL
                    mapboxAccessToken={import.meta.env.VITE_MAP_KEY}
                    initialViewState={{
                        latitude: item?.lat,
                        longitude: item?.lng,
                        zoom: 15
                    }}

                    mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                    <Marker
                        latitude={item?.lat}
                        longitude={item?.lng}
                    />
                </ReactMapGL>
            </div>
        </Box>
    )
}
Description.propTypes = {
    item: PropTypes.any.isRequired,
};
export default Description
