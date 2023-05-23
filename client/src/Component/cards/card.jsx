
import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import Layout from '../Layout/Layout'
import Cards from './cards'
import SearchBar from '../../Utils/SearchBar'
import Paginations from '../../Utils/Pagination'


const RoomCard = () => {
    const [room, setRoom] = useState()
    const [pageNumber, setPageNumber] = useState()
    const getAllRooms = async (page) => {
        const res = await axios(`${import.meta.env.VITE_APP_URL}/api/room/product-list/${page}?size=6`)
        setRoom(res.data.rooms)
        setPageNumber(res.data.totalItem)
    }

    useEffect(() => {
        getAllRooms()
    }, [])


    return (
        <Layout>
            <div >
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
            <div className="flex justify-end p-10">
                <Paginations pageNumber={pageNumber} handlePage={getAllRooms} />
            </div>
        </Layout>
    )
}

export default RoomCard
