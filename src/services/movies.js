import { apiURL } from "../contants";
import { getData } from "./method";

/**
 * @param {number} page 
 * @param {string} statusEndpoint 
 * 
 * Status Endpoint: now_playing, popular, top_rated, upcoming, latest
 */
async function getMovies(page, statusEndpoint) {
   const options = {
      params: { page }
   };

   const response = await getData(`${apiURL}/movie/${statusEndpoint}`, options);
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

async function getGenreMovie() {
   const response = await getData(`${apiURL}/genre/movie/list`);
   return response.data;
}

async function getTrending(mediaType, time = 'day') {
   let timeWindow = `${apiURL}/trending/${mediaType}`;
   switch(time) {
      case 'day':
         timeWindow += '/day';
         break;
      case 'week':
         timeWindow += '/week';
         break;
      default:
         console.log('Error Get Trending');
         break;
   }
   const response = await getData(timeWindow);
   return response.data;
}

export default { 
   getMovies, 
   getMovie,
   getGenreMovie,
   getTrending
};