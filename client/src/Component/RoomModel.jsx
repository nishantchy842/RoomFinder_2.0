import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
// import { useRef, useState } from "react";
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
    console.log(roomDetails)
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {roomDetails &&
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
                                className="mySwiper h-[200px] overflow-hidden "
                            >

                                {
                                    roomDetails?.room?.img_collection.map((item, id) => {
                                        return (
                                            <div key={id}>
                                                <SwiperSlide><img src={item} alt="/" width={100} height={100} /> </SwiperSlide>
                                            </div>
                                        )
                                    })
                                }
                            </Swiper>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h5" component="h5" className=' capitalize'>
                            <div className='flex mt-4 border-b-2'>
                                <img className="rounded-full w-16 h-16" src={`${import.meta.env.VITE_APP_URL}/uploads/${roomDetails?.room?.uPhoto}`} alt="/" />
                                <div className="grid ">
                                    <p className="m-5">{roomDetails?.room?.uName} </p>
                                    <p className="ml-5 underline">{roomDetails?.room?.uPhone} </p>
                                    <p className="ml-5 underline">{roomDetails?.room?.uEmail} </p>
                                </div>
                            </div>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h4" component="h4" className='capitalize'>
                            {roomDetails?.room?.title}
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h6" className=' capitalize'>
                            <div className='flex justify-between flex-wrap border-b-2'>
                                <p>Price per month: Nrs {roomDetails?.room?.price}</p>
                                <p>Address: {roomDetails?.room?.address}</p>
                            </div>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h6" className='capitalize border-b-2'>
                            <label>Description:</label>
                            <p> {roomDetails?.room?.description}</p>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h6" className='capitalize'>
                            <label>Amenities:</label>
                            {
                                roomDetails?.room?.amenities.map((item, id) => {
                                    return <p key={id} className=" m-2"> {item}</p>
                                })
                            }
                        </Typography>
                    </Box>
                }
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
