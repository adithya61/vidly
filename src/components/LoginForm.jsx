import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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

  doSubmit = () => {
    // call server
    console.log("submitted");
  };

  render() {

    const { data, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            
            {/* this method is in the Form class which is extended. */}
            {this.renderInput('username', 'Username', 'text')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
