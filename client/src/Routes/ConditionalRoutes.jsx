import { Route, Routes } from "react-router";
import AddLocation from "../Container/addLocation/AddLocation";
import Home from "../Container/Home/Home";
import AddDetails from "../Container/addDetails/AddDetails";
import AddRoom from "../Container/AddRoom";
import Register from "../Container/auth/Register";
import Login from "../Container/auth/Login";
import RoomCard from "../Component/cards/card";
import RespRoom from "../pages/RespectiveRoom/RespRoom";
import { useSelector } from "react-redux";
import MyPost from "../pages/PostedRoom/MyPost";
import UpdateRoom from "../pages/PostedRoom/UpdateRoom";

const ConditionalRoutes = () => {
  const { userRole } = useSelector((state) => state.user);
  if (userRole === "admin") {
    return <AdminRoute />;
  } else if (userRole === "user") {
    return <UserRoutes />;
  } else {
    return <DefaulRoutes />;
  }
}
const DefaulRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card" element={<RoomCard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Room/:slug" element={<RespRoom />} />
      <Route path="/registration" element={<Register />} />
    </Routes>
  );
};
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card" element={<RoomCard />} />
      <Route path="/add-map" element={<AddLocation />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="/Room/:slug" element={<RespRoom />} />
      <Route path="/mypost" element={<MyPost />} />
      <Route path="/update-room" element={<UpdateRoom />} />
    </Routes>
  );
};
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card" element={<RoomCard />} />
      <Route path="/add-map" element={<AddLocation />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/Room/:slug" element={<RespRoom />} />
      <Route path="/add-room" element={<AddRoom />} />
    </Routes>
  );
};
{/* 
 return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/add-map" element={<AddLocation />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<RoomCard />} />
        <Route path="/Room/:slug" element={<RespRoom />} />
      </Routes>
    </div>
  );
};


*/ }

export default ConditionalRoutes;
