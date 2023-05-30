import { useEffect, useState } from "react";
import "./aboutme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AboutMe = () => {
  const { id, userProfilePicture } = useSelector((state) => state.user);
  const [users, setUsers] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleAboutMe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/auth/user/${id}`
      );
      if (data && data.success) {
        setUsers(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAboutMe();
  }, []);

  return (
    <div className="about-me-container h-[80vh]">
      {users && (
        <div className="profile-dashboard-card">
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input className="input" type="text" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button className="btn">Update</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutMe;
