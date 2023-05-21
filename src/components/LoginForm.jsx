import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // username = React.createRef();
  // password = React.createRef();

  doSubmit = async (nav) => {
    // call server
    const { username, password } = this.state.data;
    try {
      const { data: jwt } = await loginUser(username, password);
      localStorage.setItem("token", jwt);
      console.log(jwt);
      // nav("/movies");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            {/* this method is in the Form class which is extended. */}
            {this.renderInput("username", "Username", "text")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default function LoginFormRouter() {
  const nav = useNavigate();
  return <LoginForm nav={nav}></LoginForm>;
}