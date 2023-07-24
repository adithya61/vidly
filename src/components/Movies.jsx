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
    // const genres = [{ name: "All Genres" }, ...(await getGenres())];

    const genres = [
      {
        _id: "646cd41bc6c4cf78dc0d1ad3",
        name: "Action",
      },
      {
        _id: "646cd41ac6c4cf78dc0d1aca",
        name: "Comedy",
      },
      {
        _id: "646cd41bc6c4cf78dc0d1adc",
        name: "Romance",
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ae5",
        name: "Thriller",
      },
    ];

    // this.setState({ movies: await getMovies(), genres });

    const movies = [
      {
        _id: "646cd41bc6c4cf78dc0d1ace",
        title: "The Hangover",
        numberInStock: 10,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41ac6c4cf78dc0d1aca",
          name: "Comedy",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ad0",
        title: "Wedding Crashers",
        numberInStock: 15,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41ac6c4cf78dc0d1aca",
          name: "Comedy",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ad5",
        title: "Die Hard",
        numberInStock: 5,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1ad3",
          name: "Action",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ad7",
        title: "Terminator",
        numberInStock: 10,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1ad3",
          name: "Action",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ad9",
        title: "The Avengers",
        numberInStock: 15,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1ad3",
          name: "Action",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ade",
        title: "The Notebook",
        numberInStock: 5,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1adc",
          name: "Romance",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ae0",
        title: "When Harry Met Sally",
        numberInStock: 10,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1adc",
          name: "Romance",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ae2",
        title: "Pretty Woman",
        numberInStock: 15,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1adc",
          name: "Romance",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ae7",
        title: "The Sixth Sense",
        numberInStock: 5,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1ae5",
          name: "Thriller",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1ae9",
        title: "Gone Girl",
        numberInStock: 10,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1ae5",
          name: "Thriller",
        },
      },
      {
        _id: "646cd41bc6c4cf78dc0d1aeb",
        title: "The Others",
        numberInStock: 15,
        dailyRentalRate: 2,
        genre: {
          _id: "646cd41bc6c4cf78dc0d1ae5",
          name: "Thriller",
        },
      },
    ];

    this.setState({ movies, genres });
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
      <div className="container-fluid mov">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
        <p className="badge badge-pill">
          {" "}
          There are currently {length} movies listed.{" "}
        </p>
        <br></br>

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
