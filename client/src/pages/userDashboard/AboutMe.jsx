import { useEffect, useState } from "react";
import "./aboutme.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { apiResStatus, setAlertMessages } from "../../Redux/Reducer/roomSlice";
import { userDetails } from "../../Redux/Reducer/userSlice";
import { FaUserEdit } from 'react-icons/fa'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: "70vw",
  width: "60vw",
  minWidth: "70vw",
  maxHeight: "60vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AboutMe = () => {
  const { id, userProfilePicture } = useSelector((state) => state.user);
  const [users, setUsers] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleAboutMe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/auth/user/${id}`
      );
      if (data && data.success) {
        setUsers(data.user);
        setName(data.user.name)
        setAddress(data.user.address)
        setPhone(data.user.phone)
        setEmail(data.user.email)
      }

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleAboutMe();
  }, []);

  const handleOpen = () => setOpen(true)
  const dispatch = useDispatch()
  const handleUpdate = async () => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_APP_URL}/api/auth/updateProfile`, {
        name,
        address,
        phone,
        email
      })
      dispatch(
        userDetails({
          id: data.user._id,
          username: data.user.name,
          token: data.token,
        })
      );
      dispatch(setAlertMessages(data.message));
      dispatch(apiResStatus(true));
      localStorage.setItem("token", data.token);
      localStorage.setItem("data", JSON.stringify(data));
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="about-me-container h-[80vh]">
      {users && (
        <div className="profile-dashboard-card">
          <FaUserEdit className=" relative z-20 top-[14rem] left-16 h-10 w-16" 
          onClick={()=>console.log("icon clicked")}
          />
          <img
            src={`${import.meta.env.VITE_APP_URL}/uploads/${userProfilePicture}`}
            alt="User"
            className="profile-dashboard-card-user-image"
          />

          <button className="profile-dashboard-card-button" onClick={handleOpen}>Edit Profile</button>
          <div className="profile-dashboard-card-body">
            <div className="profile-dashboard-card-info">
              <p className="profile-dashboard-card-info-title">Name:</p>
              <p className="profile-dashboard-card-info-content">
                {users.name}
              </p>
            </div>
            <div className="profile-dashboard-card-info">
              <p className="profile-dashboard-card-info-title">Address:</p>
              <p className="profile-dashboard-card-info-content">
                {users.address}
              </p>
            </div>
            <div className="profile-dashboard-card-info">
              <p className="profile-dashboard-card-info-title">Phone-no:</p>
              <p className="profile-dashboard-card-info-content">
                {users.phone}
              </p>
            </div>
            <div className="profile-dashboard-card-info">
              <p className="profile-dashboard-card-info-title">E-mail:</p>
              <p className="profile-dashboard-card-info-content">
                {users.email}
              </p>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2" className=" text-center">
            Update Profile
          </Typography>
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <TextField
              className=" w-[100%] sm:w-[50%]"
              label="Name" variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className=" w-[100%] sm:w-[50%]"
              label="Address" variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              className=" w-[100%] sm:w-[50%]"
              label="Phone" variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              className=" w-[100%] sm:w-[50%]"
              label="Email" variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <button className="btn" onClick={handleUpdate}>Update</button>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutMe;
