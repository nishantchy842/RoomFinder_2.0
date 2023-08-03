import { useNavigate } from "react-router";
import "./cards.css";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import { styles } from "../../Utils/Style";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const Cards = ({ item }) => {
  const { id } = useSelector((state) => state.user);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const handleLike = async (roomId) => {
    await axios.put(`${import.meta.env.VITE_APP_URL}/api/room/like`, {
      roomId: roomId,
    });

    setLike(true);
  };

  const handleUnlike = async (roomId) => {
    await axios.put(`${import.meta.env.VITE_APP_URL}/api/room/unlike`, {
      roomId: roomId,
    });

    setLike(false);
  };

  return (
    <div className="border">
      <div className="cards__room-img max-h-[420px] max-w-[327px]">
        <img src={item.img_collection[0]} alt="room image" />
      </div>

      <div className="cards__room-info ">
        <div className="cards__room-text">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-x-3">
              {item.uPhoto ? (
                <Avatar
                  alt="Cindy Baker"
                  src={`${import.meta.env.VITE_APP_URL}/uploads/${item.uPhoto}`}
                />
              ) : (
                <Avatar sx={{ backgroundColor: "#1a1d4e" }}>
                  {item?.uName?.charAt(0)}
                </Avatar>
              )}
              <p className=" font-bold ">{item?.uName}</p>
            </div>

            {item?.likes.includes(id) || like ? (
              <AiFillHeart
                className=" text-[red] cursor-pointer"
                onClick={() => handleUnlike(item._id)}
              />
            ) : (
              <AiFillHeart
                className=" text-black-100 cursor-pointer"
                onClick={() => handleLike(item._id)}
              />
            )}
          </div>
          <h1 className={`${styles.extrabold} capitalize`}>
            {item.title.substring(0, 20)}...
          </h1>
          <h2
            className={`${styles.sectionSubText} ml-7 text-[2px] capitalize text-slate-700`}
          >
            {item?.address?.substring(0, 30)}.....
          </h2>
          <p className="cards__description">
            {`${item.description.substring(0, 30)}.....`}
          </p>
          <div className=" flex flex-col justify-center items-center ">
            <p>
              NRs.
              <span className="cards__room__price__number">{item.price}</span>
            </p>
            <button
              className="btn"
              onClick={() => {
                navigate(`/Room/${item.title}`, { state: item });
              }}
            >
              See more details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Cards.propTypes = {
  item: PropTypes.object,
};
export default Cards;
