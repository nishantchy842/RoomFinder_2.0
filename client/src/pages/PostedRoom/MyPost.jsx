import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Cards from "../../Component/cards/cards"
import Layout from "../../Component/Layout/Layout"

const MyPost = () => {
    const [room, setRoom] = useState()
    const { id } = useSelector(state => state.user)

    const handleUserRoom = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/userRoom/${id}`)
            setRoom(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleUserRoom()
    }, [])

    return (
        <Layout>
            <div className="flex justify-center items-center flex-wrap mt-24">
                {
                    room?.rooms.map((item) => {
                        return (
                            <div key={item._id} className="border flex flex-col justify-center items-center p-2 hover:bg-[#f5f5f5]">
                                <Cards item={item} />
                                <div className=" mb-4 w-[40%] flex justify-around items-center">
                                    <button className="btn uppercase">Delete</button>
                                    <button className="btn uppercase">Update</button>
                                </div>
                            </div>
                        )

                    })

                }
            </div>
        </Layout>
    )
}

export default MyPost
