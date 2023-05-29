import { useEffect, useState } from "react";
import { styles } from "../../../Utils/Style"
import PropTypes from "prop-types";
import axios from "axios";
import Cards from "../../../Component/cards/cards";

const SimilarRoom = ({ item }) => {
    const [result, setResult] = useState()
    const handleData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/related-product/${item._id}`)
        if (data) {
            setResult(data.rooms)
        }
    }

    useEffect(() => {
        handleData()
    }, [])
    return (
        <div className={`${styles.paddingY} min-h-screen w-screen `}>
            <p className={`${styles.heroHeadText} capitalize`}>similar Rooms </p>
            <div className={` flex w-[100%] flex-row items-start flex-wrap m-6`}>
                {
                    result && result.map(item => {
                        return <Cards key={item._id} item={item} />
                    })
                }
            </div>
        </div>
    )
}
SimilarRoom.propTypes = {
    item: PropTypes.any.isRequired,
}
export default SimilarRoom
