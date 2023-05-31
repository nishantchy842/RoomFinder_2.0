import { Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GrFormView } from 'react-icons/gr'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60vw",
  minHeight: '60vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyRoomRequests = () => {
  const { id } = useSelector(state => state.user)
  const [applied, setApplied] = useState([])
  const [roomDetails, setRoomDetails] = useState({})
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/auth/user/${id}`)

      console.log(data.user.appliedRooms)
      setApplied(data.user.appliedRooms)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserRoom = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/userRoom/${id}/6?size=6`)
      setRoomDetails(data)
      // setPageNumber(data.totalItem)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleUserRoom()
  }, [])

  return (
    <div>
      <div className="about-me-container min-h-[80vh] p-2 w-screen">
        <div className="profile-dashboard-card shadows">
          <table className="table-fixed border z-10">
            <thead>
              <tr className="border">
                <th className="border">Image</th>
                <th className="border">Title</th>
                <th className="border">Address</th>
                <th className="border">Client Name</th>
                <th className="border">Client Phone</th>
              </tr>
            </thead>
            <tbody>

              {
                roomDetails && roomDetails?.rooms?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="border p-5"><img src={item?.img_collection[0]} alt="/" width={100} height={100} /> </td>
                      <td className="border p-5">{item?.title}</td>
                      <td className="border p-5">{item?.place}</td>
                      <td className="border p-5">
                        {item?.appliedCandidates.length == 0 ? <span className=" text-red-700"> No Request Yet</span> :
                          item?.appliedCandidates?.map((userinfo) => {
                            return <ul key={userinfo.userid} className="list-disc cursor-pointer">
                              <li>{userinfo?.userName}</li>
                            </ul>
                          })
                        }
                      </td>
                      <td className="border p-5">
                        {item?.appliedCandidates.length == 0 ? <span className=" text-red-700"> No Request Yet</span> :
                          item?.appliedCandidates?.map((userinfo) => {
                            return <ul key={userinfo.userid} className="list-disc">
                              <li> {userinfo?.userPhone}</li>
                            </ul>
                          })
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <table className="table-fixed border z-10">
              <thead>
                <tr className="border">
                  <th className="border">Image</th>
                  <th className="border">Title</th>
                  <th className="border">Address</th>
                  <th className="border">Client Phone</th>
                  <th className="border">Applied Date</th>
                  <th className="border">View Requests</th>
                </tr>
              </thead>
              <tbody>


              </tbody>
            </table>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default MyRoomRequests
