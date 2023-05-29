import "./aboutme.css";

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="profile-dashboard-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTK7Os2YW_6OfJJGh9rvPUSbNYqUwQXZce6mMIrqMasLen8sg4BDbHwN-UMOAV6Q_lXdvqdhbY-NqCTcGA"
          alt="User"
          className="profile-dashboard-card-user-image"
        />
        <button className="profile-dashboard-card-button">Edit Profile</button>
        <div className="profile-dashboard-card-body">
          <div className="profile-dashboard-card-info">
            <p className="profile-dashboard-card-info-title">Name:</p>
            <p className="profile-dashboard-card-info-content">
              Nishant Chaudhary
            </p>
          </div>
          <div className="profile-dashboard-card-info">
            <p className="profile-dashboard-card-info-title">Address:</p>
            <p className="profile-dashboard-card-info-content">
              Harisiddhi, Lalitpur
            </p>
          </div>
          <div className="profile-dashboard-card-info">
            <p className="profile-dashboard-card-info-title">Phone-no:</p>
            <p className="profile-dashboard-card-info-content">9852679927</p>
          </div>
          <div className="profile-dashboard-card-info">
            <p className="profile-dashboard-card-info-title">E-mail:</p>
            <p className="profile-dashboard-card-info-content">
              nishantchaudhary@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
