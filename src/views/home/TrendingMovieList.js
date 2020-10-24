import React, { useState } from 'react';
import CardLayout from 'components/CardLayout';
import { MoviePoster } from 'components/Poster';
import { Link } from 'react-router-dom';

export default function TrendingMovieSection({ movies, timeCategory, onSelectChange }) {
   const [limit] = useState(12);

   let strTimeCategory;
   switch(timeCategory) {
      case 'day':
         strTimeCategory = 'Today';
         break;
      case 'week':
         strTimeCategory = 'This Week';
         break;
      default:
         console.log('time category title');
         break;
   }

   return (
      <React.Fragment>
         <CardLayout
            title={`Trending Movie ${strTimeCategory}`}
            withAction={
               <div className="select select-customized">
                  <select value={timeCategory} onChange={(ev) => onSelectChange(ev.target.value)}>
                     <option value="day">Today</option>
                     <option value="week">This Week</option>
                  </select>
               </div>
            }
         >
            <div className="columns is-multiline">
               {movies.slice(0, limit).map(movie => (
                  <div className="column is-one-third" key={movie.id}>
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

            <Link to="/movies" className="button btn-view-all">View All Movie</Link>
         </CardLayout>
      </React.Fragment>
   )
};