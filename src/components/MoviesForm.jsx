import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import Form from "./common/form";
import Joi from "joi-browser";
import NotFound from "./NotFound";

class MoviesForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    hasMovie: true,
  };

  componentDidMount() {
    const { id } = this.props;

    if (id == "new") return;

    const movie = getMovie(id);

    if (!movie) {
      this.setState({ hasMovie: false });

      return;
    }

    const data = {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
    this.setState({ data });
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).required().label("stock"),
    dailyRentalRate: Joi.number().min(0).required().label("rate"),
  };

  doSubmit = (nav, movie) => {
    saveMovie(movie);
    nav("/movies");
  };

  render() {
    const { hasMovie } = this.state;
    if (!hasMovie) {
      return <NotFound />;
    }

    return (
      <div>
        <h1> Movies Form </h1>
        {/* name, label, type */}
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title", "text")}
            {this.renderDropDown("genre", "Genre")}
            {this.renderInput("numberInStock", "Number in Stock", "text")}
            {this.renderInput("dailyRentalRate", "rate", "text")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default function MovieFormRouter() {
  const { id } = useParams();
  const nav = useNavigate();
  return <MoviesForm id={id} nav={nav}></MoviesForm>;
}
