import React from 'react';
import Poster from 'components/Poster';

export default function MovieList({
   title,
   movies,
   isLoadMore,
   loadMoreMovies
}) {

   if(!movies || movies.length < 1) return <div>Loading...</div>

   return (
      <React.Fragment>
         <div className="cw-header">
            <h2 className="is-size-4 mb-4 cw-header-title">{title}</h2>
         </div>
         <div className="cw-body">
            <div className="columns is-multiline">
            {movies.map((movie, idx) => (
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
            <div style={{ textAlign: 'center' }}>
               <button 
                  className={`button ${isLoadMore ? 'is-loading' : ''}`} 
                  onClick={() => loadMoreMovies()}
               >
                  {isLoadMore ? 'Loading...' : 'Load More'}
               </button>
            </div>
         </div>
      </React.Fragment>
   )
};