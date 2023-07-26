import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styles } from "../../../Utils/Style";
import addressIcon from "../../../assets/address.png";

const DetailsRoom = ({ item }) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (item) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        item.lng
      },${item.lat}.json?access_token=${import.meta.env.VITE_MAP_KEY}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  }, [item]);

  const [time, setTime] = useState();

  useEffect(() => {
    // Fetch your data from MongoDB and extract the createdAt value
    const createdAt = item.createdAt; // Replace with your createdAt value
    // Calculate the relative time using Moment.js
    const relative = moment(createdAt).fromNow();

    // Update the state with the relative time
    setTime(relative);
  }, []);

  return (
    <div className={`${styles.padding} h-screen   w-[60%] shadows`}>
      <p
        className={`${styles.sectionSubText} rounded-lg lowercase bg-slate-300 text-primary absolute top-[29rem] z-10 right-11 p-2`}
      >
        {time}
      </p>
      <div className="title border-b-2 pb-3 mb-20">
        <Box sx={{ flexGrow: 1, flexWrap: "wrap" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={9}
              className={`${styles.heroSubText} pl-0 text-primary capitalize`}
            >
              {item?.title}
            </Grid>
            <Grid
              item
              className={`${styles.sectionSubText} capitalize bg-slate-400 rounded-lg text-slate-200`}
            >
              <p className="p-1">
                <strong className="text-[white]">
                  Rent per Month <br />
                </strong>
                <span className="text-primary font-bold">
                  Nrs {item?.price}
                </span>
              </p>
            </Grid>
            <Grid
              item
              className={`${styles.sectionSubText} flex items-center gap-x-2 text-primary capitalize`}
            >
              <img src={addressIcon} width={30} height={30} alt="" />
              <p>{place?.place_name}</p>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <p className={`${styles.heroSubText} text-primary mb-3 capitalize`}>
          Description
        </p>
        <p
          className={`${styles.sectionSubText} border-b-2 pb-3 text-primary capitalize mb-20`}
        >
          {item?.description}
        </p>
      </div>
      <div className="Amenities flex flex-col text-white ">
        <p className={`${styles.heroSubText} text-primary capitalize mb-3`}>
          Amenities
        </p>
        <div
          className={`${styles.sectionSubText} flex flex-wrap pb-3 border-b-2 capitalize mb-20`}
        >
          {item?.amenities[0].split(",").map((amenity, id) => {
            return (
              <ul key={id}>
                <li className="amenity_container m-1">{amenity} </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
DetailsRoom.propTypes = {
  item: PropTypes.any.isRequired,
};
export default DetailsRoom;
