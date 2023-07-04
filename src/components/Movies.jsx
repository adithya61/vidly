/* 
Import Statements.
 */
import React, { Component } from "react";
import { getMovies, getGenres, deleteMovie } from "../services/movieService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import Genre from "./common/Genre";
import { filterGenre } from "../utils/filterGenre";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: "All Genres",
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const genres = [{ name: "All Genres" }, ...(await getGenres())];

    this.setState({ movies: await getMovies(), genres });
  }

  handleLike = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== id);
    var { currentPage, pageSize } = this.state;
    this.setState({ movies });

    try {
      await deleteMovie(id);

      if (movies.length <= pageSize * (currentPage - 1)) {
        currentPage = currentPage - 1;
        this.setState({ currentPage });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie is already deleted");
      this.setState({ movies: originalMovies });
    }
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

  handleSearch = async ({ currentTarget: input }) => {
    const movies = await getMovies();
    this.setState({ currentGenre: "All Genres" });

    const filteredMovies = Object.values(movies).filter((movie) =>
      movie.title.toLowerCase().includes(input.value.toLowerCase())
    );

    this.setState({ movies: filteredMovies });
    this.setState({ currentPage: 1 });
  };

  // Render method
  render() {
    const { currentPage, pageSize, sortColumn, currentGenre } = this.state;

    const { totalCount: length, filteredData: movies } = this.getPageData();

    const { user } = this.props;

    return (
      <div className="container-fluid">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
        <p className="badge badge-pill bg-primary">
          {" "}
          There are currently {length} movies listed.{" "}
        </p>
        <br></br>

        <h4 className="info">
          The data may take some time to load as this website is deployed on a
          free service. Check out my{" "}
          <a
            className="video"
            href="https://youtu.be/AJsV4LWzBRg"
            target="_blank"
          >
            {" "}
            video{" "}
          </a>{" "}
          version of the same project.
        </h4>

        {/* </nav> */}

        <div className="row">
          <div className="col-3">
            <Genre
              allGenre={this.state.genres}
              currentGenre={currentGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>

          {/* Next column Movies */}
          <div className="col-9">
            {user && (
              <button className="btn btn-primary " onClick={this.addNewMovie}>
                {" "}
                New Movie +
              </button>
            )}
            <ToastContainer />
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleSearch}
                aria-describedby="basic-addon2"
              />
            </div>
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

export default function MovieswithRouter(props) {
  const nav = useNavigate();
  const user = props.user;

  return <Movies nav={nav} user={user} />;
}
