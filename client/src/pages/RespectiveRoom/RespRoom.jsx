import { useLocation } from "react-router";
// import React, { useRef, useState } from "react";

import Layout from "../../Component/Layout/Layout";
import ImgSwiper from "./imgSwiper";
import RoomDetails from "./RoomDetails/RoomDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Utils/loader";
const RespRoom = () => {
  const [render, setRender] = useState(false);
  const { state } = useLocation();
  const [room, setRoom] = useState({});
  const [countLike, setCountLike] = useState(0);
  const handleSingleRoom = async () => {
    setRender(false);
    const { data } = await axios.get(
      `http://localhost:8000/api/room/single-room/${state._id}`
    );
    if (data.success) {
      setRoom(data.room);
      setCountLike(data.likeCount);
    }
    setRender(true);
  };
  useEffect(() => {
    handleSingleRoom();
  }, []);
  return (
    <Layout activeMenu={"/rooms"}>
      {render ? (
        <div className="mr-10 ml-10 flex flex-col flex-shrink">
          <ImgSwiper item={room} />
          <RoomDetails item={room} countLike={countLike} />
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default RespRoom;
