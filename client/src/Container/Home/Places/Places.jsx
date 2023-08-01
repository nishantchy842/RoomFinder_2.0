import axios from "axios";
import { useEffect, useState } from "react";
import { styles } from "../../../Utils/Style";
import { useNavigate } from "react-router";
import _ from "lodash";

const Places = () => {
  const [place, setPlace] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const getAllPlaces = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/room/placename`
      );
      setPlace(data.uniquePlaces);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlaces();
  }, []);

  const handlePlace = async (item) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/room/filter/${item}`
      );
      if (data) {
        navigate(`/rooms/${item}`, { state: data.products });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [displayedPlaces, setDisplayedPlaces] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const showNextPlaces = () => {
    const nextPlaces = _.sampleSize(place, 20);
    setDisplayedPlaces(nextPlaces);
    setStartIndex(startIndex + 20);
    setShow(true);
  };
  return (
    <div className=" w-full mt-10 bg-[#f8f9f5] ">
      <h2 className={`${styles.heroSubHeadText} text-center`}>
        View rooms in popular cities
      </h2>
      <div>
        <div className="flex items-start flex-wrap justify-center item-center">
          {displayedPlaces.map((item, id) => {
            return (
              <div
                key={id}
                className="btn m-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handlePlace(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <button className="btn !bg-emerald-800" onClick={showNextPlaces}>
            {show == false ? "Show Location" : "Next Location"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Places;
