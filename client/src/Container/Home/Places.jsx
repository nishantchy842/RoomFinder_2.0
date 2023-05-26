import axios from "axios"
import { useEffect, useState } from "react"
import { styles } from "../../Utils/Style"
const Places = () => {
    const [place, setPlace] = useState()

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
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h1 className={`${styles.heroHeadText} text-slate-600`}>Room Locations</h1>
            <div className=" w-[80vw] h-auto flex ">
                {
                    place && place.map((item, id) => {
                        return <div key={id} className=" bg-secondary m-2 p-2 rounded-lg cursor-pointer" onClick={() => handlePlace(item)}>
                            {item}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Places
