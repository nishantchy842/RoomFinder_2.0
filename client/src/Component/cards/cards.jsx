import { useEffect, useState } from "react";
import "./cards.css";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate } from "react-router";

const Cards = () => {
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
    <div>
      <div className="cards__wrapper">
        <div className="cards__room-img">
          <img src="http://bit.ly/2tMBBTd" height={420} width={327} />
        </div>
        <div className="cards__room-info">
          <div className="cards__room-text">
            <h1>Room In Satdobato</h1>
            <h2>Satodobato, Lalitpur, Nepal</h2>
            <p>
              Harvest Vases are a reinterpretation
              <br /> of peeled fruits and vegetables as
              <br /> functional objects. The surfaces
              <br /> appear to be sliced and pulled aside,
              <br /> allowing room for growth.{" "}
            </p>
          </div>
          <div className="cards__room-price">
            <p>
              NRs. <span>21000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
