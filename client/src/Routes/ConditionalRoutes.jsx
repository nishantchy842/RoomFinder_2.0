import { Route, Routes } from "react-router"
import AddLocation from "../Container/addLocation/AddLocation"
import Home from "../Container/Home/Home"
import AddDetails from "../Container/addDetails/AddDetails"
import AddImages from "../Container/addImage/AddImage"
import AddRoom from "../Container/AddRoom"
import Register from "../Container/auth/Register"
import Login from "../Container/auth/Login"
import RoomCard from '../Component/cards/card'

const ConditionalRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/add-map" element={<AddLocation />} />
      <Route path="/add-image" element={<AddImages />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/card" element={<RoomCard />} />
      
      </Routes>
    </div>
  )
}

export default ConditionalRoutes
