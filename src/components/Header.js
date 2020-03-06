import React from "react";
import logo from "./review-ready-logo.png";

const Header = () => {
  return (
    <div id="wrapper-navbar">
      <div
        id="site-branding"
        className="row align-items-center bg-primary px-5"
      >
        <div id="site-logo" className="col-md-4 pt-3 pb-4">
          <img src={logo} className="img-fluid" alt="Review Ready" scale="0" />
        </div>
      </div>
    </div>
  );
};

export default Header;
