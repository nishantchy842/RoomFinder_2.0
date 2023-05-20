import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const Cards = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="grid grid-cols-1 bg-white rounded-md"
        onClick={() => navigate(`/Room/${item.title}`, { state: item })}
      >
        <img
          className="rounded-md rounded-b-none"
          src={item.img_collection[0]}
        />
        <div className="p-4">
          <h2 className="font-semibold">{item.title}</h2>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            {item.price}
          </button>
          <p className="text-xs mt-1">{item.description}</p>
        </div>
      </div>
    </div>
  );
};
Cards.propTypes = {
  item: PropTypes.object,
};
export default Cards;
