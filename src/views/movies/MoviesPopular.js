import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import Poster from 'components/Poster';

export default function MoviesPopular() {
   const [popular, setPopular] = useState([]);
   const [page, setPage] = useState(1);
   const [isLoadMore, setIsLoadMore] = useState(false);

   useEffect(() => {
      const getMoviesPopular = async () => {
         setIsLoadMore(true);
         const response = await API.getMoviesPopular(page);
         setPopular(prevData => [...prevData, ...response.results]);
         setIsLoadMore(false);
      };
      getMoviesPopular();
   }, [page]);

   const loadMoreMovies = () => setPage(prevPage => prevPage + 1);

   return (
      <div className="card-wrapper">
         <div className="cw-header">
            <h2 className="is-size-4 mb-4">Popular</h2>
         </div>
         <div className="cw-body">
            <div className="columns is-multiline" style={{ display: 'flex' }}>
               {popular.map((movie, idx) => (
                  <div className="column is-one-fifth is-6-mobile" key={idx}>
                     <Poster
                        detailId={movie.id}
                        poster={movie.poster_path}
                        title={movie.title}
                        releaseDate={movie.release_date}
                        rating={movie.vote_average}
                     />
                  </div>
               ))}
            </div>
            <div style={{textAlign: 'center'}}>
               <button className={`button ${isLoadMore ? 'is-loading' : ''}`} onClick={() => loadMoreMovies()}>
                  {isLoadMore ? 'Loading...' : 'Load More'}
               </button>
            </div>
         </div>
      </div>
   )
};