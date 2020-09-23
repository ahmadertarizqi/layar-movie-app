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

async function getMovie(dataID) {
   const options = {
      params: {
         append_to_response: 'external_ids,credits,videos,images'
      }
   };

   const response = await getData(`${apiURL}/movie/${dataID}`, options);
   return response;
}

export default { getMoviesNowPlaying, getMoviesPopular, getMovie };