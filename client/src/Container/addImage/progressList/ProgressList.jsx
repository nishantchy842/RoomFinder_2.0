import { ImageList } from '@mui/material';
import PropTypes from "prop-types";
import ProgressItem from './ProgressItem';
import { memo } from 'react';
const ProgressList = ({ files }) => {
    console.log(files)
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
    files: PropTypes.node.isRequired,
  };
  export default memo(ProgressList);
