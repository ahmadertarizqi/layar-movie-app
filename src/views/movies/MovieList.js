import React from 'react';
import { MoviePoster } from 'components/Poster';
import CardLayout from 'components/CardLayout';
import Loading from 'components/Loading';

export default function MovieList({
   title,
   movies,
   isLoadMore,
   loadMoreMovies
}) {

   if(!movies || movies.length < 1) {
      return (
         <div className="loading-wrapper-centered">
            <Loading width={50} height={50} />
            <h4 className="has-text-white">Loading...</h4>
         </div>
      )
   }

   return (
      <React.Fragment>
         <CardLayout title={title}>
            <div className="columns is-multiline is-mobile">
               {movies.map((movie, idx) => (
                  <div className="column is-6-mobile is-one-third-tablet is-one-fifth-desktop " key={idx}>
                     <MoviePoster
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
                  className={`button is-outlined ${isLoadMore ? 'is-loading' : ''}`} 
                  onClick={() => loadMoreMovies()}
               >
                  {isLoadMore ? 'Loading...' : 'Load More'}
               </button>
            </div>
         </CardLayout>
      </React.Fragment>
   )
};