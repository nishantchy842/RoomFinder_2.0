import { useEffect, useState } from "react";
import { styles } from "../../../Utils/Style";
import PropTypes from "prop-types";
import axios from "axios";
import Cards from "../../../Component/cards/cards";

const SimilarRoom = ({ item }) => {
  const [firstRoom, setFirstRoom] = useState();
  const [secondRoom, setSecondRoom] = useState();
  const [thirdRoom, setThirdRoom] = useState();
  const [fourthRoom, setFourthRoom] = useState();
  const handleData = async () => {
    const { data } = await axios.post(`http://127.0.0.1:9800/recommend_rooms`, {
      room_id: item._id,
    });
    console.log(data);
    const first = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/room/single-room/${data[0]}`
    );
    console.log(first);

    setFirstRoom(first.data.room);
    console.log(firstRoom);
    const second = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/room/single-room/${data[1]}`
    );
    setSecondRoom(second.data.room);

    const third = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/room/single-room/${data[2]}`
    );
    setThirdRoom(third.data.room);

    const fourth = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/room/single-room/${data[3]}`
    );
    setFourthRoom(fourth.data.room);
  };
  useEffect(() => {
    handleData();
  }, [firstRoom, secondRoom, thirdRoom]);

  return (
    <div className={`${styles.paddingY} w-[30%] `}>
      <p className={`${styles.heroSubHeadText} capitalize`}>
        Recommended Rooms
      </p>
      <div className={` grid w-[100%]`}>
        {firstRoom && <Cards key={item._id} item={firstRoom} />}
        {secondRoom && <Cards key={item._id} item={secondRoom} />}
        {thirdRoom && <Cards key={item._id} item={thirdRoom} />}
        {fourthRoom && <Cards key={item._id} item={fourthRoom} />}
      </div>
    </div>
  );
};
SimilarRoom.propTypes = {
  item: PropTypes.any.isRequired,
};
export default SimilarRoom;
