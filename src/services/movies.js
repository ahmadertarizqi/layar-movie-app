import { apiKEY, apiURL } from "../contants";
import { getData } from "./method";
import genres from 'services/genres.json';

/**
 * @param {number} page 
 * @param {string} statusEndpoint 
 * 
 * Status Endpoint: now_playing, popular, top_rated, upcoming, latest
 */
async function getMovies(page, statusEndpoint) {
   const response = await getData(`${apiURL}/movie/${statusEndpoint}`, {
      params: { 
         api_key: apiKEY,
         page: page
      }
   });
   return response.data;
}

async function getMovie(dataID) {
   const response = await getData(`${apiURL}/movie/${dataID}`, {
      params: { 
         api_key: apiKEY,
         append_to_response: 'external_ids,credits,videos,images,similar'
      }
   });
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

   const response = await getData(timeWindow, {
      params: { api_key: apiKEY }
   });
   return response.data;
}

function genreHardcodeJson(data) {
   return new Promise((resolve, reject) => {
      if(data) {
         resolve(data)
      } else {
         reject('Promise: GenreHardcode is Rejected')
      }
   });
}

async function getGenreMovie() {
   const response = await genreHardcodeJson(genres);
   return response;
}

async function getMoviesByGenre(genreID) {
   const response = await getData(`${apiURL}/discover/movie`, {
      params: {
         api_key: apiKEY,
         with_genres: genreID
      }
   });
   return response.data;
}

export default {
   getMovies, 
   getMovie,
   getGenreMovie,
   getTrending,
   getMoviesByGenre
};