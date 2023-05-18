import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ReactMapGL, {
    Marker,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from "prop-types";

const Description = ({item}) => {
    return (
        <div className='max-w-[50%]'>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: 'auto' }} >
                    <div className='max-h-[200px] border max-w-[500px] w-[20%]'>
                        chat box
                    </div>
                    <div className='h-[500px] w-[500px]'>
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
            </Container>
        </div>
    )
}
Description.propTypes = {
    item: PropTypes.any.isRequired,
};
export default Description
