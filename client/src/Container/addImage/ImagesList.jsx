import { GiCancel } from 'react-icons/gi';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import deleteFile from '../../firebase/deleteFile';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_IMAGES } from '../../Redux/Reducer/roomSlice';

const ImagesList = () => {
  const { images } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const handleDelete =async (image) => {
    dispatch(DELETE_IMAGES(image));
    const imageName = image?.split('?')[0];
    try {
      await deleteFile(`rooms/${imageName}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ImageList
      rowHeight={250}
      sx={{
        '&.MuiImageList-root': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))!important',
        },
      }}
    >
      {images.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img src={image} alt="rooms" loading="lazy" style={{ height: '100%' }} />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            }}
            actionIcon={
              <IconButton sx={{ color: 'white' }} onClick={() => handleDelete(image)}>
                <GiCancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList
