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
import PageNotFound from "../Utils/PageNotFound";
import SearchResult from "../pages/searchResult/SearchResult";
import RoomsAccPlace from "../Container/Home/Places/RoomsAccPlace";
import Dashboard from "../pages/userDashboard/Dashboard";
// import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import EmailVerify from "../Container/auth/emailVerify";
import ManageUsers from "../pages/adminDashboard/manageUsers";
import Learn from "../pages/learn";
import Dashboard_admin from "../pages/adminDashboard";

const ConditionalRoutes = () => {
  const { userRole } = useSelector((state) => state.user);
  if (userRole === "admin") {
    return <AdminRoute />;
  } else if (userRole === "user") {
    return <UserRoutes />;
  } else {
    return <DefaulRoutes />;
  }
};
const DefaulRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<RoomCard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Room/:slug" element={<RespRoom />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/result" element={<SearchResult />} />
      <Route path="/rooms/:place" element={<RoomsAccPlace />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
    </Routes>
  );
};
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<RoomCard />} />
      <Route path="/add-map" element={<AddLocation />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="/Room/:slug" element={<RespRoom />} />
      <Route path="/mypost" element={<MyPost />} />
      <Route path="/update-room" element={<UpdateRoom />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/result" element={<SearchResult />} />
      <Route path="/user-dashboard" element={<Dashboard />} />
      <Route path="/rooms/:place" element={<RoomsAccPlace />} />
    </Routes>
  );
};
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard_admin />} />
      <Route path="/rooms" element={<RoomCard />} />
      <Route path="/update-room" element={<UpdateRoom />} />
      <Route path="/add-map" element={<AddLocation />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/Room/:slug" element={<RespRoom />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/result" element={<SearchResult />} />
      <Route path="/rooms/:place" element={<RoomsAccPlace />} />
      <Route path="/manage_users" element={<ManageUsers />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
};

export default ConditionalRoutes;
