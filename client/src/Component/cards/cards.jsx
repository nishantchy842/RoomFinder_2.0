import { useNavigate } from "react-router";
import "./cards.css";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";

const Cards = ({ item }) => {
  const navigate = useNavigate()
  return (
    <div >
      <div className="cards__wrapper cursor-pointer" onClick={() => navigate(`/Room/${item.title}`, { state: item })}>
        <div className="cards__room-img">
          <img src={item.img_collection[0]} height={420} width={327} />
        </div>

        <div className="cards__room-info">
          <div className="cards__room-text">
            <div className="flex justify-start">
              <Avatar alt="Cindy Baker" src={`${import.meta.env.VITE_APP_URL}/uploads/${item?.uPhoto}`} />
              <p className="bold m-2">{item?.uName}</p>
            </div>
            <h1 className="cards__title">{item.title}</h1>
            <h2 className="cards__subtitle underline">{item?.address}</h2>
            <p className="cards__description">
              {`${item.description.substring(0, 50)}.....`}
            </p>
          </div>
          <div className="cards__room__price__container">
            <p className="cards__room__price__text">
              NRs. <span className="cards__room__price__number">{item.price}</span>
            </p>
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
