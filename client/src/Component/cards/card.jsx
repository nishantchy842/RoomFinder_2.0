
import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import Layout from '../Layout/Layout'
import Cards from './cards'


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
            <div className='flex justify-center items-center flex-wrap mt-24'>
                {
                    room?.map((item) => {
                        return (
                            <Cards  key={item._id} item={item} />
                        )
                    })
                }

            </div>
        </Layout>
    )
}

export default RoomCard
