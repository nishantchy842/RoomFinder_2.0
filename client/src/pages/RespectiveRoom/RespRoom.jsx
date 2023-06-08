import { useLocation } from "react-router"
// import React, { useRef, useState } from "react";

import Layout from "../../Component/Layout/Layout";
import ImgSwiper from "./imgSwiper";
import RoomDetails from "./RoomDetails/RoomDetails";
import { useEffect, useState } from "react";
const RespRoom = () => {
  const [render, setRender] = useState(false)
  const { state } = useLocation()
  useEffect(() => {
    setRender(true)
  }, [render])
  return (
    <Layout>
      <div className="mr-10 ml-10 flex flex-col flex-shrink">
        <ImgSwiper item={state} />
        <RoomDetails item={state} />
      </div>
    </Layout>
  )
}

export default RespRoom
