import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetLoginDetails } from "../../Redux/Reducer/userSlice";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, userProfilePicture, username } = useSelector(
    (state) => state.user
  );

  const settings = [username, "My Post", "Dashboard", "Logout"];

  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    if (e.target.textContent == "Logout") {
      dispatch(resetLoginDetails());
      localStorage.removeItem("token");
      navigate("/");
    }
    if (e.target.textContent == "My Post") {
      navigate("/mypost");
    }
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-20 bg-[#295d61]">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
          onClick={() => navigate("/")}
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          RoomFinder
        </div>

        {isLoggedIn ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src={`${
                  import.meta.env.VITE_APP_URL
                }/uploads/${userProfilePicture}`}
                sx={{ width: 50, height: 50 }}
              >
                {" "}
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <button className="btn" onClick={() => navigate("/login")}>
            LOGIN
          </button>
        )}

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#295d61] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <button
            className="btn text-white py-2 px-6 rounded md:ml-8
    duration-500"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
