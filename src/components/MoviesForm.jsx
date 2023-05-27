import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import NotFound from "./NotFound";
import { getMovie, saveMovie, getGenres } from "../services/movieService";

class MoviesForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).required().label("stock"),
    dailyRentalRate: Joi.number().min(0).required().label("rate"),
  };

  async componentDidMount() {
    const genres = await getGenres();

    this.setState({ genres });

    const { id } = this.props;

    if (id == "new") return;

    try {
      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapToView(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.nav("/not-found");
      }
    }
  }

  mapToView = (movie) => {
    const data = {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genre: movie.genre.name,
      // name -> await getGenreId(movie.genre.name),
    };

    return data;
  };

  doSubmit = async (nav) => {
    try {
      await saveMovie(this.state.data);
      nav("/movies");
    } catch (ex) {
        console.log(ex.response.data);
    }
  };

  render() {
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
