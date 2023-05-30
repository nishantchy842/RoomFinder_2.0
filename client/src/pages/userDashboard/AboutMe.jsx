import { useEffect, useState } from "react";
import "./aboutme.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AboutMe = () => {
  const { id, userProfilePicture } = useSelector((state) => state.user);
  const [users, setUsers] = useState({});

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
          <button className="profile-dashboard-card-button">Edit Profile</button>
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
    </div>
  );
};

export default AboutMe;