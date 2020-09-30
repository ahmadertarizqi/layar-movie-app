import { apiURL } from "../contants";
import { getData } from "./method";

async function getMoviesNowPlaying() {
   const response = await getData(`${apiURL}/movie/now_playing`);
   return response.data;
}

async function getMoviesPopular() {
   const response = await getData(`${apiURL}/movie/popular`);
   return response.data;
}

async function getMovie(dataID) {
   const options = {
      params: {
         append_to_response: 'external_ids,credits,videos,images,similar'
      }
   };

   const response = await getData(`${apiURL}/movie/${dataID}`, options);
   return response.data;
}

export default { getMoviesNowPlaying, getMoviesPopular, getMovie };