import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ isLoggedIn, handleLoginLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a className="navbar-brand" href="/">MyWebsite</a>
      <div className="ms-auto">
        
        <button
          className="btn btn-primary"
          onClick={handleLoginLogout}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
