import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./input";
import { getGenres } from "../../services/movieService";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    genres: [],
  };

  // handleChange -> validateProperty -> validate.
  handleChange = ({ currentTarget: input }) => {
    if (!input) return;
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const errors = {};

    const options = { abortEarly: false };

    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return;

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value,
    };

    const schema = {
      [name]: this.schema[name],
    };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit(this.props.nav);
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary login">
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    return (
      <Input
        name={name}
        value={this.state.data[name]}
        label={label}
        onChange={this.handleChange}
        type={type}
        error={this.state.errors[name]}
      />
    );
  }

  renderDropDown(name, label) {
    const genres = this.state.genres;
    const filteredGenre = genres.filter(
      (genre) => genre.name !== this.state.data[name]
    );
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select onChange={this.handleChange} name={name} id={label}>
          <option key="default" value={this.state.data[name]}>
            {this.state.data[name]}
          </option>
          {filteredGenre.map((genre) => (
            <option key={genre._id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Form;
