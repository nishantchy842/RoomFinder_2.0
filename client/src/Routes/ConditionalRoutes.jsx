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
      <Route path="/result" element={<SearchResult />} />
      <Route path="/rooms/:place" element={<RoomsAccPlace />} />
      <Route path="*" element={<PageNotFound />} />

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
      <Route path="*" element={<PageNotFound />} />
      <Route path="/result" element={<SearchResult />} />
      <Route path="/rooms/:place" element={<RoomsAccPlace />} />

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
      <Route path="*" element={<PageNotFound />} />
      <Route path="/result" element={<SearchResult />} />
      <Route path="/rooms/:place" element={<RoomsAccPlace />} />

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
