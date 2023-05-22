
import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import Layout from '../Layout/Layout'
import Cards from './cards'
import SearchBar from '../../Utils/SearchBar'


const RoomCard = () => {
    const [room, setRoom] = useState()
    const getAllRooms = async () => {
        const res = await axios('http://localhost:8000/api/room/room')
        setRoom(res.data.rooms)
    }

    useEffect(() => {
        getAllRooms()
    }, [])
    return (
        <Layout>
            <div>
                <SearchBar />
            </div>
            <div className='flex w-[100%] justify-center items-center flex-wrap mt-6'>
                {
                    room?.map((item) => {
                        return (
                            <Cards key={item._id} item={item} />
                        )
                    })
                }

            </div>
        </Layout>
    )
}

export default RoomCard
