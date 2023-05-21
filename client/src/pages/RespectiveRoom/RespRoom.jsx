import { useLocation } from "react-router"
// import React, { useRef, useState } from "react";

import Layout from "../../Component/Layout/Layout";
import ImgSwiper from "./imgSwiper";
import RoomDetails from "./RoomDetails/RoomDetails";
const RespRoom = () => {
    const {state} = useLocation()
  return (
    <Layout>      
      <ImgSwiper item={state} />
      <RoomDetails item={state} />
    </Layout>
  )
}

export default RespRoom
