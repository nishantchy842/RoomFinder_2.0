import { Route, Routes } from "react-router"
import AddLocation from "../Container/addLocation/AddLocation"
import Home from "../Container/Home/Home"
import AddDetails from "../Container/addDetails/AddDetails"
import AddImage from "../Container/addImage/AddImage"
import AddRoom from "../Container/AddRoom"
import Register from "../Container/auth/Register"
import Login from "../Container/auth/Login"

const ConditionalRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/add-map" element={<AddLocation />} />
      <Route path="/add-image" element={<AddImage />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      </Routes>
    </div>
  )
}

export default ConditionalRoutes
