import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink to="/movies"> Movies </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/customers"> Customers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/rentals"> Rentals </NavLink>
          </li>
          {props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/profile"> {props.user["name"]} </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout"> Logout </NavLink>
              </li>
            </React.Fragment>
          )}
          {!props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/login"> Login </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register"> Register </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
