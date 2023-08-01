import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useSelector } from "react-redux";
import SideBar from "./sideBar";

const Layout = ({ activeMenu, defaultOpenKeys, children }) => {
  const { userRole } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      {userRole == "admin" ? (
        <div>
          <Header />
          <div className="flex">
            <SideBar
              activeMenu={activeMenu}
              defaultOpenKeys={defaultOpenKeys}
            />
            <main className="min-h-[90vh] max-w-[80vw] ml-72">{children}</main>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <Header />
          <main className="min-h-[90vh]">{children}</main>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activeMenu: PropTypes.any,
  defaultOpenKeys: PropTypes.any,
};
export default Layout;
