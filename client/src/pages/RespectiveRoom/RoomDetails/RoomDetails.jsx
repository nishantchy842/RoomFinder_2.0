// import { Box, } from '@mui/material';
import Description from "./description";
import PropTypes from "prop-types";
import DetailsRoom from "./DetailsRoom";
import LandLord from "./LandLord";
import SimilarRoom from "./SimilarRoom";
import CommentSection from "./commentSection";

const RoomDetails = ({ item, countLike }) => {
  return (
    <>
      <div className="pt-24 flex justify-around items-start text-start flex-wrap">
        <DetailsRoom item={item} countLike={countLike} />
        <LandLord item={item} />
        <Description item={item} />
      </div>
      <div className="flex">
        <CommentSection item={item} />
        <SimilarRoom item={item} />
      </div>
    </>
  );
};
RoomDetails.propTypes = {
  item: PropTypes.any.isRequired,
  countLike: PropTypes.any,
};
export default RoomDetails;
