import PropTypes from "prop-types";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
const ImgSwiper = ({ item }) => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-[50vh] mt-24 border-b-2"
            >
                {
                    item?.img_collection.map((image, id) => {
                        return <SwiperSlide key={id} className=" "><img src={image} alt="/" /> </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}

ImgSwiper.propTypes = {
    item: PropTypes.any.isRequired,
};

export default ImgSwiper
