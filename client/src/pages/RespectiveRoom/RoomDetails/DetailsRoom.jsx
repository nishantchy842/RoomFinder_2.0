import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import moment from 'moment';




const DetailsRoom = ({ item }) => {
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (item) {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.lng},${item.lat}.json?access_token=${import.meta.env.VITE_MAP_KEY}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => setPlace(data.features[0]));
        }
    }, [item]);

    const [time, setTime] = useState()


    useEffect(() => {
        // Fetch your data from MongoDB and extract the createdAt value
        const createdAt = item.createdAt; // Replace with your createdAt value
        // Calculate the relative time using Moment.js
        const relative = moment(createdAt).fromNow();

        // Update the state with the relative time
        setTime(relative);
    }, []);



    return (
        <div className="max-w-[50%]">
            <div className="title border-b-2">
                <p>{time}</p>
                <p>Title: {item.title}</p>
                <p>Address: {place?.place_name}</p>
                <p>Nrs: {item.price} price/Month</p>
            </div>
            <div className="Description border-b-2">

                {item.description}

            </div>
            <div className="Amenities border-b-2 flex text-white ">
                {
                    item?.amenities[0].split(",").map((amenity, id) => {
                        return <ul key={id}>
                            <li className="bg-slate-600 w-20 m-1 h-7 rounded">{amenity} </li>
                        </ul>
                    })
                }
            </div>
        </div>
    )
}
DetailsRoom.propTypes = {
    item: PropTypes.any.isRequired,
};
export default DetailsRoom
