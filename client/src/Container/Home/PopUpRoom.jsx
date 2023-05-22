import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';


const PopupRoom = ({ popupInfo }) => {
    const navigate = useNavigate()
    const { title, description, price, images,address,amenities,lat,lng } = popupInfo;

    const item = {
        title,
        description,
        price,
        img_collection: images,
        address,
        amenities,
        lat,
        lng
    }
    console.log(item)

    return (
        <Card sx={{ maxWidth: 400 }}>
            <ImageListItem sx={{ display: 'block' }}>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                        zIndex: 2,
                    }}
                    title={price}
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
                                    overflow: 'hidden',
                                    width: '100%',
                                    cursor: 'pointer',
                                    objectFit: 'cover',
                                }}
                                onClick={() => navigate(`/Room/${item.title}`, {state: item})}

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