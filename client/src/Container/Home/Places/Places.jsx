import axios from "axios"
import { useEffect, useState } from "react"
import { styles } from "../../../Utils/Style"
import { useNavigate } from "react-router"
const Places = () => {
    const [place, setPlace] = useState()
    const navigate = useNavigate()
    const getAllPlaces = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/placename`)
            setPlace(data.uniquePlaces)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllPlaces()
    }, [])

    const handlePlace = async (item) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/filter/${item}`)
            if(data){
                navigate(`/rooms/${item}`,{state: data.products})
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="min-h-[50vh]">
            <h1 className={`${styles.heroHeadText} text-center`}>Room Locations</h1>
            <div className=" w-[80vw] flex items-start flex-wrap ">
                {
                    place && place.map((item, id) => {
                        return <div key={id} className="btn m-2 p-2 rounded-lg cursor-pointer" onClick={() => handlePlace(item)}>
                            {item}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Places
