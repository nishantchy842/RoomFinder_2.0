
import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import moment from 'moment/moment'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router'


const RoomCard = () => {
    const navigate = useNavigate()
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
            <div className='flex flex-wrap flex-shrink-0 mt-20'>
                {
                    room?.map((item) => {
                        return (
                            <article key={item._id} className="card cursor-pointer" onClick={()=>navigate(`/Room/${item.title}`,{state: item})}>
                                <div className="temporary_text">
                                    <img src={item.img_collection[0]} alt='/' />
                                </div>
                                <div className="card_content">
                                    <span className="card_title">{item.title}</span>
                                    <span className="card_subtitle flex">Nrs: {item.price} /month {""} <p>{moment().startOf('hour').fromNow()}</p></span>
                                   
                                    <p className="card_description">Lorem ipsum dolor, sit amet  expedita exercitationem recusandae aut dolor tempora aperiam itaque possimus at, cupiditate earum, quae repudiandae aspernatur? Labore minus soluta consequatur placeat.</p>

                                </div>
                            </article>
                        )
                    })
                }

            </div>
        </Layout>
    )
}

export default RoomCard
