import React from "react";
import { NavLink, Link } from "react-router-dom";
import { paginate } from "../utils/paginate";

const Navbar = (props) => {
  return (
    <nav className="navigation">
      <li className="">
        <a className="link navbar-brand" href="/">
          <svg
            className="vidly-brand"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
          </svg>
          <span className="brand-name">Vidly</span>
        </a>
      </li>
      <div className="hold" id="navbarNav">
        <ul className="bar">
          <div className="other-pages">
            <li className="nav-item">
              <NavLink className={"link pages"} to="/movies">
                {" "}
                Movies{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"link pages"} to="/customers">
                {" "}
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"link pages"} to="/rentals">
                {" "}
                Rentals{" "}
              </NavLink>
            </li>
          </div>
          {props.user && (
            <React.Fragment>
              <li className="nav-item">
                <button className="btn btn-dark">
                  <NavLink className={"link"} to="/profile">
                    {" "}
                    {props.user["name"]}{" "}
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-dark">
                  <NavLink className={"link"} to="/logout">
                    {" "}
                    Logout{" "}
                  </NavLink>
                </button>
              </li>
            </React.Fragment>
          )}
          {!props.user && (
            <React.Fragment>
              <li className="nav-item">
                <button className="btn btn-dark">
                  <NavLink className={"link"} to="/login">
                    {" "}
                    Login{" "}
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-dark">
                  <NavLink className={"link"} to="/register">
                    {" "}
                    Register{" "}
                  </NavLink>
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
