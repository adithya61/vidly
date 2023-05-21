import axios from "axios";
import { log } from "joi-browser";

async function getGenres() {
  const { data: genres } = await axios.get("http://localhost:3900/api/genres");

  return genres;
}

export { getGenres };
