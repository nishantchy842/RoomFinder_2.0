import { ImageList } from '@mui/material';
import PropTypes from "prop-types";
import ProgressItem from './ProgressItem';
const ProgressList = ({ files }) => {
  return (
    <ImageList
      rowHeight={250}
      sx={{
        '&.MuiImageList-root': {
          gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr))!important',
        },
      }}
    >
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  );
};
ProgressList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.any).isRequired,
};
  export default ProgressList
