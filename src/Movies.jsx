import React, { Component } from "react";
import ReactDOM from "react-dom";
import { getMovies } from "./services/fakeMovieService";
import bootstrap from "bootstrap/dist/css/bootstrap.css";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (id) => {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };
  render() {
    // object destructuring.
    const { length } = this.state.movies;

    if (length === 0)
      return (
        <div className="badge badge-pill bg-warning">
          There are currently no movies in your list
        </div>
      );
    return (
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <p className="badge badge-pill bg-primary">
            {" "}
            There are currently {length} movies listed.{" "}
          </p>
        </nav>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <div>
                  <button
                    onClick={() => this.handleDelete(movie._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
