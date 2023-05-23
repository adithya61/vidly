import axios from "axios";
import { log } from "joi-browser";

const apiEndPoint = "/genres";

async function getGenres() {
  const { data: genres } = await axios.get("/genres");

  return genres;
}

export { getGenres };
