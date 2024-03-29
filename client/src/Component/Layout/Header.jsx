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
import Notification from "../../Utils/notification";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, userProfilePicture, username, userRole } = useSelector(
    (state) => state.user
  );

  const settings = [username, "My Room", "Logout"];
  const admin = [username, "Manage users", "Manage rooms", "Logout"];

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
    if (e.target.textContent == "My Room") {
      navigate("/mypost");
    }
    if (e.target.textContent === username) {
      navigate("/user-dashboard");
    }
    if (e.target.textContent == "Manage users") {
      navigate("/manage_users");
    }
    if (e.target.textContent == "Manage rooms") navigate("/rooms");
  };

  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          className=" bg-[#f5f5f5] shadow-md w-full fixed top-0 left-0 z-20  p-2"
        >
          <Toolbar disableGutters className="flex justify-between">
            <div
              className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]
    text-gray-800"
              onClick={() => navigate("/")}
            >
              <span className="text-3xl text-indigo-600 mr-1 pt-2">
                <ion-icon name="logo-ionic"></ion-icon>
              </span>
              <span className="font-sans text-2xl ml-2">RoomFinder</span>
            </div>
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Notification />
              {isLoggedIn ? (
                <Tooltip title={`Hello ${username}`}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userProfilePicture ? (
                      <Avatar
                        alt="Remy Sharp"
                        src={`${
                          import.meta.env.VITE_APP_URL
                        }/uploads/${userProfilePicture}`}
                        sx={{ width: 50, height: 50 }}
                      >
                        {" "}
                      </Avatar>
                    ) : (
                      <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }}>
                        {username.toUpperCase().charAt(0)}{" "}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
              ) : (
                <button className="btn" onClick={() => navigate("/login")}>
                  LOGIN
                </button>
              )}

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userRole == "user"
                  ? settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))
                  : admin.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
