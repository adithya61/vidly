import React from "react";
import { NavLink, Link } from "react-router-dom";
import { paginate } from "../utils/paginate";

const Navbar = (props) => {
  return (
    <nav className="navigation">
      <li className="">
        <a className=" link navbar-brand" href="/">
          Vidly
        </a>
      </li>
      <div className="hold" id="navbarNav">
        <ul className="bar">
          <li className="nav-item">
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
