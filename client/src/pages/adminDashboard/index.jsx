import AdminDashboard from "./AdminDashboard";
import Layout from "../../Component/Layout/Layout";

export default function Dashboard_admin() {
  return (
    <Layout activeMenu={"/"}>
      <AdminDashboard />
    </Layout>
  );
}
