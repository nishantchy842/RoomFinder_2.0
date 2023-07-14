import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styles } from "../../Utils/Style";
import { useNavigate } from "react-router";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  minHeight: "60vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyRoomRequests = () => {
  const { id } = useSelector((state) => state.user);
  const [applied, setApplied] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleUser = async (userid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/auth/user/${userid}`
      );

      console.log(data);
      setApplied(data.user);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserRoom = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/room/userRoom/${id}/6?size=6`
      );
      setRoomDetails(data);
      // setPageNumber(data.totalItem)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserRoom();
  }, []);

  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h2"
        component="h2"
        className="z-20 capitalize text-center"
      >
        My Room Request
      </Typography>
      <div className="about-me-container p-2 w-full ">
        {roomDetails?.rooms?.length == 0 ? (
          <div className="text-center">
            <p>No Room yet</p>
            <button className="btn" onClick={() => navigate("/add-room")}>
              Post Your Room
            </button>
          </div>
        ) : (
          <div className="profile-dashboard-card shadows ">
            <table className="table-fixed border z-10">
              <thead>
                <tr className="border">
                  <th className="border">Image</th>
                  <th className="border">Title</th>
                  <th className="border">Address</th>
                  <th className="border">Client Name</th>
                  <th className="border">Client Phone</th>
                  <th className="border">Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {roomDetails &&
                  roomDetails?.rooms?.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="border p-5">
                          <img
                            src={item?.img_collection[0]}
                            alt="/"
                            width={100}
                            height={100}
                          />{" "}
                        </td>
                        <td className="border p-5">{item?.title}</td>
                        <td className="border p-5">{item?.place}</td>
                        <td className="border p-5">
                          {item?.appliedCandidates.length == 0 ? (
                            <span className=" text-red-700">
                              {" "}
                              No Request Yet
                            </span>
                          ) : (
                            item?.appliedCandidates?.map((userinfo) => {
                              return (
                                <ul
                                  key={userinfo.userid}
                                  className="list-disc cursor-pointer"
                                >
                                  <li
                                    onClick={() => handleUser(userinfo.userid)}
                                    className=" hover:text-slate-600"
                                  >
                                    {userinfo?.userName}
                                  </li>
                                </ul>
                              );
                            })
                          )}
                        </td>
                        <td className="border p-5">
                          {item?.appliedCandidates.length == 0 ? (
                            <span className=" text-red-700">
                              {" "}
                              No Request Yet
                            </span>
                          ) : (
                            item?.appliedCandidates?.map((userinfo) => {
                              return (
                                <ul key={userinfo.userid} className="list-disc">
                                  <li> {userinfo?.userPhone}</li>
                                </ul>
                              );
                            })
                          )}
                        </td>
                        <td className="border p-5">
                          {item?.appliedCandidates.length == 0 ? (
                            <span className=" text-red-700">
                              {" "}
                              No Request Yet
                            </span>
                          ) : (
                            item?.appliedCandidates?.map((userinfo) => {
                              return (
                                <ul key={userinfo.userid} className="list-disc">
                                  <li> {userinfo?.appliedDate}</li>
                                </ul>
                              );
                            })
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            Tenant Details
          </Typography>

          {!applied ? (
            "Tenant is no more with use"
          ) : (
            <div
              className={`${styles.padding} shadows flex flex-col justify-center items-center`}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <img
                  className=" rounded-full w-[100px] h-[100px]"
                  src={`${import.meta.env.VITE_APP_URL}/uploads/${
                    applied.profile
                  }`}
                  alt="profile"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span>
                  {" "}
                  <strong> Name:</strong>
                </span>{" "}
                {applied.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span>
                  {" "}
                  <strong> Phone:</strong>
                </span>{" "}
                {applied.phone}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span>
                  {" "}
                  <strong> Email:</strong>
                </span>{" "}
                {applied.email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span>
                  {" "}
                  <strong> Address:</strong>
                </span>{" "}
                {applied.address}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MyRoomRequests;
