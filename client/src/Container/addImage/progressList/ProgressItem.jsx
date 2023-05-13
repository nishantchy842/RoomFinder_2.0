import { MdCheckCircleOutline } from 'react-icons/md'
import { Box, ImageListItem } from '@mui/material';
import { useCallback, useEffect, useState,memo } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../../firebase/uploadFileProgress';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { UPDATE_IMAGES } from '../../../Redux/Reducer/roomSlice';


const ProgressItem = ({ file }) => {
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState(null);
    const dispatch = useDispatch()
    const backDrop = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0, .5)',
    };

    //   const {
    //     state: { currentUser },
    //     dispatch,
    //   } = useValue();
    const uploadImage = useCallback(async () => {
        const imageName = uuidv4() + '.' + file.name.split('.').pop();
        try {
            const url = await uploadFileProgress(
                file,
                `rooms`,
                imageName,
                setProgress
            );

            // dispatch({ type: 'UPDATE_IMAGES', payload: url });
            dispatch(UPDATE_IMAGES(url));
            setImageURL(null);
        } catch (error) {
            // dispatch({
            //   type: 'UPDATE_ALERT',
            //   payload: { open: true, severity: 'error', message: error.message },
            // });
            console.log(error);
        }
    }, [file]);

    useEffect(() => {
        setImageURL(URL.createObjectURL(file));
        uploadImage();
    }, []);

    return (
        imageURL && (
            <ImageListItem cols={1} rows={1}>
                <img src={imageURL} alt="gallery" loading="lazy" />
                <Box sx={backDrop}>
                    {progress < 100 ? (
                        <CircularProgressWithLabel value={progress} />
                    ) : (
                        <MdCheckCircleOutline
                            sx={{ width: 60, height: 60, color: 'lightgreen' }}
                        />
                    )}
                </Box>
            </ImageListItem>
        )
    );
};
ProgressItem.propTypes = {
    file: PropTypes.node,
};
export default memo(ProgressItem);

