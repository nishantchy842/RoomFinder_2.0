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
                    <div className='bg-[blue] min-h-[100px] border min-w-[100px] '>
                        chat box
                    </div>
                    <div className='h-[400px] w-[400px] '>
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
