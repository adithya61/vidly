import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Customers from "./components/Customers";
import LoginFormRouter from "./components/LoginForm";
import Logout from "./components/Logout";
import MovieswithRouter from "./components/Movies";
import MoviesFormRouter from "./components/MoviesForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import RegisterFormRouter from "./components/RegisterForm";
import Rentals from "./components/Rentals";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";

const user = getCurrentUser();

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid">
      <BrowserRouter>
        <Navbar user={user} />
        {/* <Movies /> */}
        <Routes>
          <Route path="/movies" element={<MovieswithRouter user={user} />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/register" element={<RegisterFormRouter />} />
          <Route path="/login" element={<LoginFormRouter />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/movies/:id"
            element={<ProtectedRoute to="login" component={MoviesFormRouter} />}
          />
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
