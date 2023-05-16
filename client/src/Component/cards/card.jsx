
import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'


const RoomCard = () => {
    const [room, setRoom] = useState()
    const [image, setImage] = useState()
    const getAllRooms = async () => {
        const res = await axios('http://localhost:8000/api/room/room')
        setRoom(res.data.rooms)
    }
    useEffect(() => {
        getAllRooms()
    }, [])
    return (
        <>
            <div className='flex flex-wrap flex-shrink-0'>
                {
                    room?.map((item) => {
                        return (
                            <article key={item._id} className="card">
                                <div className="temporary_text">
                                    <img src={item.img_collection[0]} alt='/' />
                                </div>
                                <div className="card_content">
                                    <span className="card_title">This is a Title</span>
                                    <span className="card_subtitle">Thsi is a subtitle of this page. Let us see how it looks on the Web.</span>
                                    <p className="card_description">Lorem ipsum dolor, sit amet  expedita exercitationem recusandae aut dolor tempora aperiam itaque possimus at, cupiditate earum, quae repudiandae aspernatur? Labore minus soluta consequatur placeat.</p>

                                </div>
                            </article>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RoomCard
