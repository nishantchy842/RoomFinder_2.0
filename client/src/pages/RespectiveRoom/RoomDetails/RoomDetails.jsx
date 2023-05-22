// import { Box, } from '@mui/material';
import Description from './description';
import PropTypes from "prop-types";
import DetailsRoom from './DetailsRoom';


const RoomDetails = ({ item }) => {
    return (
        <div className='min-h-screen flex justify-center items-center text-center flex-shrink flex-wrap'>
        
                <DetailsRoom item={item} />
                <Description item={item} />

        </div>
    )
}
RoomDetails.propTypes = {
    item: PropTypes.any.isRequired,
};
export default RoomDetails
