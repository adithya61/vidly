import http from "./httpService";
import config from "../config/config.json";

const apiEndPoint = config.apiUrl;

async function getMovies() {
  const { data: movies } = await http.get(apiEndPoint + "/movies");

  return movies;
}

async function deleteMovie(id) {
  await http.delete(apiEndPoint + "/movies/" + id);
}

async function getMovie(id) {
  return http.get(apiEndPoint + "/movies/" + id);
}

async function getGenres() {
  const { data: genres } = await http.get(apiEndPoint + "/genres");

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

    console.log(body, "body with id");
    return http.put(apiEndPoint + "/movies/" + movie._id, body);
  }
  console.log(body, "body with new");
  return await http.post(apiEndPoint + "/movies", body);
}

export { getMovies, getGenres, deleteMovie, getMovie, getGenreId, saveMovie };
