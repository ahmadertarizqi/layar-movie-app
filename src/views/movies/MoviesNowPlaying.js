import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import Poster from 'components/Poster';

export default function MoviesNowPlaying() {
   const [nowplaying, setNowPlaying] = useState([]);

   useEffect(() => {
      const getMoviesNowPlaying = async () => {
         const response = await API.getMoviesNowPlaying();
         setNowPlaying(response.data.results);
      }
      getMoviesNowPlaying();
   }, []);

   return (
      <div className="card-wrapper">
         <div className="cw-header">
            <h2 className="is-size-4 mb-4">Now Playing</h2>
         </div>
         <div className="cw-body">
            <div className="columns is-multiline">
               {nowplaying.map(movie => (
                  <Poster key={movie.id} poster={movie.poster_path} title={movie.title} />
               ))}
            </div>
         </div>
      </div>
   )
};