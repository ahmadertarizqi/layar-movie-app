import { apiURL } from "../constants";
import { getData } from "./method";

async function getMoviesNowPlaying() {
   const response = await getData(`${apiURL}/movie/now_playing`);
   return response;
}

async function getMoviesPopular() {
   const response = await getData(`${apiURL}/movie/popular`);
   return response;
}

export default { getMoviesNowPlaying, getMoviesPopular };