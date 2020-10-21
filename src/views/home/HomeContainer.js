import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import { Link } from 'react-router-dom';
// import HomeBanner from 'components/HomeBanner';
import { BoxGenre, BoxGenreItem } from 'components/BoxGenre';
import TrendingMovieList from './TrendingMovieList';
import TrendingPeopleList from './TrendingPeopleList';

export default function Browse() {
   const [genresMovie, setGenresMovie] = useState([]);
   const [trendingMovie, setTrendingMovie] = useState([]);
   const [trendingPeople, setTrendingPeople] = useState([]);
   const [timeCategory, setTimeCategory] = useState('day');

   useEffect(() => {
      const getGenre = async () => {
         const results = await API.getGenreMovie();
         setGenresMovie(results);
      };

      const getTrendingPeople = async () => {
         const response = await API.getTrending('person');
         setTrendingPeople(response.results);
      };

      getGenre();
      getTrendingPeople();
   }, []);

   const getTrendingMovie = async (time) => {
      const response = await API.getTrending('movie', time);
      setTrendingMovie(response.results);
   };

   useEffect(() => {
      getTrendingMovie(timeCategory);
   }, [timeCategory]);

   return (
      <div>
         <BoxGenre data={genresMovie}>
            {genresMovie.map(genre => (
               <BoxGenreItem key={genre.id}>
                  <Link to={{
                     pathname: `/genres/${genre.id}`,
                     state: {
                        currentGenrePage: genre.name
                     }
                  }} className="box-genre-item-value">
                     {genre.name}
                  </Link>
               </BoxGenreItem>
            ))}
         </BoxGenre>

         <div className="mb-5"></div>
         
         <div className="columns">
            <div className="column is-8">
               <TrendingMovieList 
                  movies={trendingMovie} 
                  timeCategory={timeCategory}
                  onSelectChange={setTimeCategory} 
               />
            </div>
            <div className="column is-4">
               <TrendingPeopleList peoples={trendingPeople} />
            </div>
         </div>
      </div>
   )
};