import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import HomeBanner from 'components/HomeBanner';
import CardLayout from 'components/CardLayout';
import Poster from 'components/Poster';

export default function Browse() {
   const [genresMovie, setGenresMovie] = useState([]);
   const [genresLimit, setGenresLimit] = useState(8);
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
         <div className="box-genre-wrapper">
            <div className="columns is-multiline">
               {genresMovie.slice(0, genresLimit).map(genres => (
                  <Link to={`/genres/${genres.id}`} className="column" key={genres.id}>
                     <div className="box-genre-item">
                        <p>{genres.name}</p>
                     </div>
                  </Link>
               ))}
               <div className="column">
                  <div className="box-genre-item">
                     <p><Icon.ArrowRight /> </p>
                  </div>
               </div>
            </div>
         </div>
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