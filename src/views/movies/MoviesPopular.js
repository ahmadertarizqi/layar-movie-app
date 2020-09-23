import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import Poster from 'components/Poster';

export default function MoviesPopular() {
   const [popular, setPopular] = useState([]);

   useEffect(() => {
      const getMoviesPopular = async () => {
         const response = await API.getMoviesPopular();
         setPopular(response.data.results);
      }
      getMoviesPopular();
   }, []);

   return (
      <div className="card-wrapper">
         <div className="cw-header">
            <h2 className="is-size-4 mb-4">Popular</h2>
         </div>
         <div className="cw-body">
            <div className="columns is-multiline" style={{ display: 'flex' }}>
               {popular.map(movie => (
                  <Poster 
                     key={movie.id} 
                     detailId={movie.id}
                     poster={movie.poster_path} 
                     title={movie.title}
                     releaseDate={movie.release_date}
                     rating={movie.vote_average}
                  />
               ))}
            </div>
         </div>
      </div>
   )
};