import { apiURL } from "../constants";
import { getData } from "./method";

async function getMoviesNowPlaying() {
   const response = await getData(`${apiURL}/movie/now_playing`);
   return response;
}

export default { getMoviesNowPlaying };