import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import MovieswithRouter from "./components/Movies";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import MoviesFormRouter from "./components/MoviesForm";
import RegisterFormRouter from "./components/RegisterForm";
import LoginFormRouter from "./components/LoginForm";
import jwt_decode from "jwt-decode";

try {
  const jwt = localStorage.getItem("token");
  var user = jwt_decode(jwt);
} catch (ex) {}

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <BrowserRouter>
        <Navbar user={user} />
        {/* <Movies /> */}
        <Routes>
          <Route path="/movies" element={<MovieswithRouter />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/register" element={<RegisterFormRouter />} />
          <Route path="/login" element={<LoginFormRouter />} />
          <Route path="/movies/:id" element={<MoviesFormRouter />} />
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
