import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    height: "80vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const RoomModel = ({ roomDetails, open, handleClose }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper"
                        >

                            {
                                roomDetails.room.img_collection.map((item, id) => {
                                    return <SwiperSlide key={id}><img src={item} alt="/" width={200} height={200} /> </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h4" component="h4">
                    {roomDetails.room.title}
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}
RoomModel.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    roomDetails: PropTypes.object
};

export default RoomModel
