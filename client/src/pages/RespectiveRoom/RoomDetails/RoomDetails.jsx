import { Box, } from '@mui/material';
import Description from './description';
import PropTypes from "prop-types";
import DetailsRoom from './DetailsRoom';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const RoomDetails = ({ item }) => {
    return (
        <div>
            <Box
                sx={{
                    maxWidth: '100vw',
                    minHeight: '50vh',
                    textAlign: 'center',
                    display: 'flex',
                    // flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap:'2',
                    flexWrap: 'wrap'
                }}
            >
                <DetailsRoom item={item} />
                <Description item={item} />

            </Box>
        </div>
    )
}
RoomDetails.propTypes = {
    item: PropTypes.any.isRequired,
};
export default RoomDetails
