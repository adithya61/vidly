import React from "react";
import { NavLink, Link } from "react-router-dom";
import { paginate } from "../utils/paginate";

const Navbar = (props) => {
  return (
    <nav className="navigation">
      <div className="holder" id="navbarNav">
        <ul className="bar">
          <li className="nav-item">
            <a className="navbar-brand" href="/" style={{ color: "#fff" }}>
              Vidly
            </a>
          </li>
          <li className="nav-item active">
            <NavLink className={"link"} to="/movies">
              {" "}
              Movies{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={"link"} to="/customers">
              {" "}
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={"link"} to="/rentals">
              {" "}
              Rentals{" "}
            </NavLink>
          </li>
          {props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className={"link"} to="/profile">
                  {" "}
                  {props.user["name"]}{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"link"} to="/logout">
                  {" "}
                  Logout{" "}
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {!props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className={"link"} to="/login">
                  {" "}
                  Login{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"link"} to="/register">
                  {" "}
                  Register{" "}
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
