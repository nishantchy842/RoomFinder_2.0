import { Route, Routes } from "react-router"
import AddLocation from "../Container/addLocation/AddLocation"
import Home from "../Container/Home/Home"
import AddDetails from "../Container/addDetails/AddDetails"

const ConditionalRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-details" element={<AddDetails />} />
      <Route path="/add-room" element={<AddLocation />} />
      </Routes>
    </div>
  )
}

export default ConditionalRoutes
