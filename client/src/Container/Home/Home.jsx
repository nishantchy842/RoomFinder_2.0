// import { useNavigate } from "react-router";
import Layout from "../../Component/Layout/Layout";
import ClusterMap from "./ClusterMap";
import Select from "./select";

const Home = () => {
  // const navigate = useNavigate();
  return (
    <Layout>
      <div className="mt-[5.5rem] flex flex-col justify-center items-center">
        <ClusterMap />
        <Select />
      </div>
    </Layout>
  );
};

export default Home;
