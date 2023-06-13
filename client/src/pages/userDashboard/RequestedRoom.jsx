import axios from "axios"
import { useEffect, useState } from "react"
import { AiOutlineFolderView } from "react-icons/ai"
import { useSelector } from "react-redux"
import RoomModel from "../../Component/RoomModel"
import { Typography } from "@mui/material"

const RequestedRoom = () => {
    const { id } = useSelector(state => state.user)
    const [applied, setApplied] = useState([])
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [roomDetails, setRoomDetails] = useState({})
    const handleUser = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/auth/user/${id}`)
            setApplied(data.user.appliedRooms)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleUser()
    }, [])

    const handleRoom = async (roomid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/single-room/${roomid}`)
            setRoomDetails(data)
            setOpen(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h2" component="h2" className='z-20 capitalize text-center'>
                Requested Rooms
            </Typography>

            <div className="about-me-container h-[80vh]">
                {
                    applied.length == 0 ? "there is no Request yet" :
                        <div className="profile-dashboard-card">

                            <table className="table-fixed border z-10 scroll-auto">
                                <thead>
                                    <tr className="border">
                                        <th className="border">Name</th>
                                        <th className="border">Price</th>
                                        <th className="border">Phone</th>
                                        <th className="border">Applied Date</th>
                                        <th className="border">View</th>
                                    </tr>
                                </thead>
                                {
                                    applied && applied.map((item) => {
                                        return (
                                            <tbody key={item.roomid}>
                                                <tr>
                                                    <td className="border p-5">{item.roomUname}</td>
                                                    <td className="border p-5">{item.roomPrice}</td>
                                                    <td className="border p-5">{item.roomUphone}</td>
                                                    <td className="border p-5">{item.appliedDate}</td>
                                                    <td className="border p-5">
                                                        <button className="btn" onClick={() => handleRoom(item.roomid)}><AiOutlineFolderView /></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })

                                }
                            </table>

                        </div>
                }
            </div>

            <RoomModel roomDetails={roomDetails} open={open} handleClose={handleClose} />
        </div>
    )
}

export default RequestedRoom
