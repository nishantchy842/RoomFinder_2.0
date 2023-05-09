import PropTypes from 'prop-types';
import React from "react";
import Footer from "./Footer"
import Header from "./Header"


const Layout = ({ children }) => {
    return (
      <React.Fragment>
        <Header />
        <main className="min-h-[70vh] h-[90vh]">{children}</main>
        <Footer />
      </React.Fragment>
    );
  };

  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Layout