import { useNavigate } from "react-router"
import Layout from "../../Component/Layout/Layout"
import ClusterMap from "./ClusterMap"

const Home = () => {
    const navigate = useNavigate()
  return (
    <Layout>
     
      <div className="mt-[10rem]">
      This is home
      <ClusterMap />
      <button className="btn" onClick={()=>navigate('/add-room')}> List room </button>
      <button className="btn" > Find room </button>
      </div>
    </Layout>
  )
}

export default Home
