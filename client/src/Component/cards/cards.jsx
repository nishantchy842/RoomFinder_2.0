import { useNavigate } from "react-router";
import "./cards.css";
import PropTypes from "prop-types";

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
            <h1 className="cards__title">{item.title}</h1>
            <h2 className="cards__subtitle">{item?.address}</h2>
            <p className="cards__description">
              {item.description}
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
