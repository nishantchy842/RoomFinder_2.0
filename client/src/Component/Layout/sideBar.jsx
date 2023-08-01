// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
import { Avatar, Image, Menu } from "antd";
// import { BiSolidUserRectangle, BiCategory } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillBuildingFill, BsFillPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./sidebar.module.scss";
import { useSelector } from "react-redux";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    "Dashboard",
    "/",
    <div className="icon-wrapper ">
      <LuLayoutDashboard className={"outline-icon"} />
    </div>
  ),
  getItem(
    "Manage Users",
    "/manage_users",
    <div className="icon-wrapper ">
      <BsFillPeopleFill className={"outline-icon"} />
    </div>
  ),
  getItem(
    "Mange Rooms",
    "/rooms",
    <div className="icon-wrapper ">
      <BsFillBuildingFill className={"outline-icon"} />
    </div>
  ),
  getItem(
    "Manage Category",
    "/category",
    <div className="icon-wrapper ">
      <BiCategoryAlt className={"outline-icon"} />
    </div>
  ),
  getItem(
    "Manage Amenities",
    "/category",
    <div className="icon-wrapper ">
      <BiCategoryAlt className={"outline-icon"} />
    </div>
  ),
];
const SideBar = ({ activeMenu, defaultOpenKeys = "" }) => {
  const router = useNavigate();
  const { userProfilePicture } = useSelector((state) => state.user);
  const onClick = (e) => {
    router(e.key);
  };
  return (
    <div className={styles.sidebar_container}>
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => router(`/`)}
      >
        <Image
          width={100}
          src={`${import.meta.env.VITE_APP_URL}/uploads/${userProfilePicture}`}
          preview={false}
        />
      </div>
      <Menu
        theme={"light"}
        onClick={onClick}
        className="shadows"
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[activeMenu]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

SideBar.propTypes = {
  activeMenu: PropTypes.string,
  defaultOpenKeys: PropTypes.string,
};
export default SideBar;
