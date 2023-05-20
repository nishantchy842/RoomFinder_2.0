import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cards from "../../Component/cards/cards"
import Layout from "../../Component/Layout/Layout"
import { apiResStatus, setAlertMessages } from "../../Redux/Reducer/roomSlice"
import { message, Popconfirm } from 'antd';

const MyPost = () => {
    const [room, setRoom] = useState()
    const [isDeleted, setIsDeleted] = useState(false);

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
