import { useLocation } from "react-router"
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Layout from "../Component/Layout/Layout";
const RespRoom = () => {
    const {state} = useLocation()
    console.log(state)
  return (
    <Layout>      
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
        className="mySwiper h-[70vh] mt-24"
      >
      {
        state?.img_collection.map((item,id)=>{
          return <SwiperSlide key={id}  className=" "><img src={item} alt="/" /> </SwiperSlide>
        })
      }
        
      </Swiper>
    
    </Layout>
  )
}

export default RespRoom
