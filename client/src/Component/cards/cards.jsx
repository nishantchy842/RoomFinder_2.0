import { useNavigate } from "react-router";
import "./cards.css";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import { styles } from '../../Utils/Style'
const Cards = ({ item }) => {
  const navigate = useNavigate()
  return (
    <div className=" border p-2 h-[100%]">
      <div className="cards__wrapper cursor-pointer" >
        <div className="cards__room-img max-h-[420px] max-w-[327px]">
          <img src={item.img_collection[0]} alt="room image" />
        </div>

        <div className="cards__room-info ">
          <div className="cards__room-text">
            <div className="flex justify-start">
              {
                item.uPhoto ?
                  (<Avatar alt="Cindy Baker" src={`${import.meta.env.VITE_APP_URL}/uploads/${item.uPhoto}`} />)
                  :
                  (<Avatar sx={{ backgroundColor: '#1a1d4e' }} >{item?.uName?.charAt(0)}</Avatar>)
              }
              <p className='bold m-2'>{item?.uName}</p>
            </div>
            <h1 className={`${styles.heroSubText} capitalize`}>{item.title.substring(0, 30)}...</h1>
            <h2 className={`${styles.sectionSubText} ml-7 text-[2px] capitalize text-slate-700`}>{item?.address.substring(0, 50)}.....</h2>
            <p className="cards__description">
              {`${item.description.substring(0, 50)}.....`}
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center ">
            <p> NRs. <span className="cards__room__price__number">{item.price}</span></p>
            <button className="btn" onClick={() => navigate(`/Room/${item.title}`, { state: item })}>See more details</button>
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
