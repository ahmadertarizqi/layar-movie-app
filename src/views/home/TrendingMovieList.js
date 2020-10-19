import React, { useState } from 'react';
import CardLayout from 'components/CardLayout';
import Poster from 'components/Poster';

export default function TrendingMovieSection({ movies }) {
   const [timeCategory, setTimeCategory] = useState('day');
   const [limit, setLimit] = useState(15);

   return (
      <React.Fragment>
         <CardLayout
            title="Trending Movie"
            withAction={
               <div className="select select-customized">
                  <select value={timeCategory} onChange={(ev) => setTimeCategory(ev.target.value)}>
                     <option value="day">Today</option>
                     <option value="week">This Week</option>
                  </select>
               </div>
            }
         >
            <div className="columns is-multiline">
               {movies.slice(0, limit).map(movie => (
                  <div className="column is-one-third" key={movie.id}>
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
         </CardLayout>
      </React.Fragment>
   )
};