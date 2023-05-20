import { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";
import moment from "moment/moment";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router";
import Cards from "./cards";

const RoomCard = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState();
  const getAllRooms = async () => {
    const res = await axios("http://localhost:8000/api/room/room");
    setRoom(res.data.rooms);
  };
  useEffect(() => {
    getAllRooms();
  }, []);
  return (
    <Layout>
      <div className="mx-auto max-w-sm flex flex-col justify-center my-12">
        {room?.map((item) => {
          return <Cards key={item._id} item={item} />;
        })}
      </div>
    </Layout>
  );
};

export default RoomCard;
