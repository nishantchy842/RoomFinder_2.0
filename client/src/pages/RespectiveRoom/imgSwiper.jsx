import PropTypes from "prop-types";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";
const ImgSwiper = ({ item }) => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    "@0.00": {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    "@0.75": {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    "@1.00": {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    "@1.50": {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper h-[50vh] mt-24 border-b-2 "
            >
                {
                    item?.img_collection.map((image, id) => {
                        return <SwiperSlide key={id} ><img src={image} alt="/" /> </SwiperSlide>
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
