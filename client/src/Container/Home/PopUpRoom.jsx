import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { styles } from '../../Utils/Style';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const PopupRoom = ({ popupInfo }) => {
    const navigate = useNavigate()
    const {
        title,
        description,
        price,
        images,
        address,
        amenities,
        lat,
        lng,
        createdAt,
        uPhone,
        uEmail,
        uName,
        uPhoto,
        roomId
    } = popupInfo;

    const item = {
        title,
        description,
        price,
        img_collection: images,
        address,
        amenities,
        lat,
        lng,
        createdAt,
        uPhone,
        uEmail,
        uName,
        uPhoto,
        _id: roomId
    }
    console.log(item.createdAt)

    return (
        <Card sx={{ maxWidth: 400, overflow: 'hidden' }}>
            <ImageListItem sx={{ display: 'block' }}>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                        zIndex: 2,
                    }}
                    title={<span className={`${styles.heroSubText} border rounded-lg`}>Nrs {price}</span>}
                    position="top"
                />
                <ImageListItemBar
                    title={title}
                    subtitle={description.substr(0, 30) + '...'}
                    sx={{ zIndex: 2, cursor: 'pointer' }}
                />
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay
                    lazy='true'
                    pagination={{ clickable: true }}
                    style={{
                        '--swiper-pagination-color': 'rgba(255,255,255, 0.8)',
                        '--swiper-pagination-bullet-inactive-color': '#fff',
                        '--swiper-pagination-bullet-inactive-opacity': 0.5,
                        overflow: 'hidden',
                    }}
                >
                    {images.map((url) => (
                        <SwiperSlide key={url}>
                            <Box
                                component="img"
                                src={url}
                                alt="room"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    width: '100%',
                                    cursor: 'pointer',
                                    objectFit: 'cover',
                                }}
                                onClick={() => navigate(`/Room/${item.title}`, { state: item })}

                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ImageListItem>
        </Card>
    );
};

PopupRoom.propTypes = {
    popupInfo: PropTypes.object,
}

export default PopupRoom;
