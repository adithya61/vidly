import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import Form from "./common/form";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async (nav) => {
    try {
      const response = await registerUser(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
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
        <h1>Register</h1>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            {/* this method is in the Form class which is extended. */}
            {this.renderInput("username", "Username", "text")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name", "text")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default function RegisterFormRouter() {
  const nav = useNavigate();
  return <RegisterForm nav={nav}></RegisterForm>;
}
