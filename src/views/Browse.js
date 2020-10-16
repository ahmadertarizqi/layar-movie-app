import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import { Link } from 'react-router-dom';
import HomeBanner from 'components/HomeBanner';
import CardLayout from 'components/CardLayout';
import Poster from 'components/Poster';
import { BoxGenre, BoxGenreItem } from 'components/BoxGenre';

export default function Browse() {
   const [genresMovie, setGenresMovie] = useState([]);
   const [trendingMovie, setTrendingMovie] = useState([]);
   const [timeCategory, setTimeCategory] = useState('day');

   useEffect(() => {
      const getGenre = async () => {
         const response = await API.getGenreMovie();
         setGenresMovie(response.genres);
      };
      getGenre();
   }, []);

   useEffect(() => {
      const getTrendingMovie = async () => {
         const response = await API.getTrendingMovie(timeCategory);
         setTrendingMovie(response.results);
      };
      getTrendingMovie();
   }, [timeCategory]);

   return (
      <div>
         <BoxGenre data={genresMovie}>
            {genresMovie.map(genre => (
               <BoxGenreItem key={genre.id}>
                  <Link to={`/genres/${genre.id}`} className="box-genre-item-value">
                     {genre.name}
                  </Link>
               </BoxGenreItem>
            ))}
         </BoxGenre>
         <div className="mb-5"></div>
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
            <div className="row-overflow-horizontal">
               <div className="columns">
                  {trendingMovie.map(movie => (
                     <div className="column is-one-fifth" key={movie.id}>
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
            </div>
         </CardLayout>
      </div>
   )
};