// import { useNavigate } from "react-router";
import Layout from "../../Component/Layout/Layout";
import ClusterMap from "./ClusterMap";
import Card from "./Card";

const Home = () => {
  // const navigate = useNavigate();
  return (
    <Layout>
      <div className="mt-[10rem]">
        This is home
        <ClusterMap />
        <Card />
      </div>
    </Layout>
  );
};

export default Home;
