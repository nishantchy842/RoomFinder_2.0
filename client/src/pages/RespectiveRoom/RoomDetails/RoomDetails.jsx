// import { Box, } from '@mui/material';
import Description from './description';
import PropTypes from "prop-types";
import DetailsRoom from './DetailsRoom';
import LandLord from './LandLord';


const RoomDetails = ({ item }) => {
    return (
        <div className='min-h-[80vh] pt-24 flex justify-around items-start text-start flex-shrink flex-wrap'>

            <DetailsRoom item={item} />
            <LandLord item={item} />
            <Description item={item} />

        </div>
    )
}
RoomDetails.propTypes = {
    item: PropTypes.any.isRequired,
};
export default RoomDetails
