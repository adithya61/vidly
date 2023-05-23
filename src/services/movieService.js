import http from "./httpService";
import config from "../config/config.json";

async function getMovies() {
  const { data: movies } = await http.get("/movies");

  return movies;
}

async function deleteMovie(id) {
  await http.delete("/movies/" + id);
}

async function getMovie(id) {
  return http.get("/movies/" + id);
}

async function getGenres() {
  const { data: genres } = await http.get("/genres");

  return genres;
}

async function getGenreId(name) {
  const genres = await getGenres();

  let genreId;

  genres.map((genre) => {
    if (genre["name"] == name) {
      genreId = genre["_id"];
    }
  });

  return genreId;
}

async function saveMovie(movie) {
  const body = { ...movie };
  const genreId = await getGenreId(movie.genre);
  delete body.genre;
  body.genreId = genreId;

  if ("_id" in movie) {
    delete body._id;

    return http.put("/movies/" + movie._id, body);
  }
  return await http.post("/movies", body);
}

export { getMovies, getGenres, deleteMovie, getMovie, getGenreId, saveMovie };
