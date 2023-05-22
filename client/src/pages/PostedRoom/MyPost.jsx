import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cards from "../../Component/cards/cards"
import Layout from "../../Component/Layout/Layout"
import { UPDATE_AMENITIES, UPDATE_DETAILS, UPDATE_IMAGES, UPDATE_LOCATION, apiResStatus, setAlertMessages } from "../../Redux/Reducer/roomSlice"
import { message, Popconfirm } from 'antd';
import { useNavigate } from "react-router"

const MyPost = () => {
    const [room, setRoom] = useState(null)
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate()
    const { id } = useSelector(state => state.user)
    const dispatch = useDispatch()

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
    }, [isDeleted])

    //when update button click you will get the room by its id and dispatch to the redux

    const handleUpdate = async (rid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room//single-room/${rid}`)
            console.log(data)
            dispatch(UPDATE_LOCATION({ lng: data.room.lng, lat: data.room.lat }))
            dispatch(UPDATE_DETAILS({
                title: data.room.title,
                description: data.room.description,
                price: data.room.price,
                address: data.room.address
            }))
            data.room?.amenities.map(item => {
                return dispatch(UPDATE_AMENITIES(item.split(',')))
            })
            dispatch(UPDATE_IMAGES(data.room?.img_collection))
            navigate('/update-room', { state: rid })
        } catch (error) {
            console.log(error)
        }
    }



    //handle delete room 
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_APP_URL}/api/room/deleteroom/${id}`)
            if (data && data.success) {
                dispatch(setAlertMessages(data.message))
                dispatch(apiResStatus(true))
                setIsDeleted(true)
            } else {
                dispatch(setAlertMessages(data.message))
                dispatch(apiResStatus(false))
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    return (
        <Layout>
            <div className="flex justify-center items-center flex-wrap mt-24">
                {
                    room?.rooms?.length !== 0 ?
                        room?.rooms.map((item) => {
                            return (
                                <div key={item._id} className="border flex flex-col justify-center items-center p-2 hover:bg-[#f5f5f5]">
                                    <Cards item={item} />
                                    <div className=" mb-4 w-[40%] flex justify-around items-center">
                                        <Popconfirm
                                            title="Delete the room"
                                            description="Are you sure to delete this room?"
                                            onConfirm={() => handleDelete(item._id)}
                                            onCancel={cancel}
                                            okText={<span style={{ color: 'green' }}>Yes</span>}
                                            cancelText={<span style={{ color: 'red' }}>No</span>}
                                        >
                                            <button type="link" className="btn uppercase">Delete </button>
                                        </Popconfirm>
                                        <button
                                            className="btn uppercase"
                                            onClick={() => handleUpdate(item._id)}
                                        >Update</button>
                                    </div>
                                </div>
                            )

                        }) : <div className="h-[80vh] flex flex-col justify-center items-center">
                            <p> No room yet </p>
                            <button className="btn" onClick={() => navigate('/add-room')}>click here to post room</button>
                        </div>


                }
            </div>
        </Layout>
    )
}

export default MyPost
