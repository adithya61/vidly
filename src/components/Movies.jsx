/* 
Import Statements.
 */
import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import Genre from "./common/Genre";
import { filterGenre } from "../utils/filterGenre";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Customers from "./Customers";
import Rentals from "./Rentals";
import { Routes, Route, useNavigate } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: "All",
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleLike = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = (id) => {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre });
    // after chaning genre you start from page 1.
    this.setState({ currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      sortColumn,
      currentGenre,
    } = this.state; // movies: allMovies renaming.

    const genreMovies = filterGenre(allMovies, currentGenre);

    const length = genreMovies.length;

    const sorted = _.orderBy(
      genreMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: length, filteredData: movies };
  };

  addNewMovie = () => {
    const nav = this.props.nav;
    nav("/movies/new");
  };

  render() {
    const { currentPage, pageSize, sortColumn, currentGenre } = this.state;

    const { totalCount: length, filteredData: movies } = this.getPageData();

    if (length === 0)
      return (
        <div className="badge badge-pill bg-warning">
          There are currently no movies in your list
        </div>
      );

    return (
      <div className="container">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
        <p className="badge badge-pill bg-primary">
          {" "}
          There are currently {length} movies listed.{" "}
        </p>
        {/* </nav> */}

        <div className="row">
          <div className="col-3">
            <Genre
              allGenre={this.state.genres}
              currentGenre={currentGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary mb-4" onClick={this.addNewMovie}>
              {" "}
              New Movie +
            </button>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default function MovieswithRouter() {
  const nav = useNavigate();

  return <Movies nav={nav} />;
}
