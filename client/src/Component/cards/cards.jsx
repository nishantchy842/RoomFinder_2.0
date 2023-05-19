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
            <h1>{item.title}</h1>
            <h2>{item?.address}</h2>
            <p>
              {item.description}
            </p>
          </div>
          <div className="cards__room-price">
            <p>
              NRs. <span>{item.price}</span>
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
