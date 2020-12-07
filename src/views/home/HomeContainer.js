import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import { Link } from 'react-router-dom';
import { BoxGenre, BoxGenreItem } from 'components/BoxGenre';
import TrendingMovieList from './TrendingMovieList';
import TrendingPeopleList from './TrendingPeopleList';
import Loading from 'components/Loading';

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

   if(genresMovie.length < 1 || trendingMovie.length < 1 || trendingPeople.length < 1) {
      return (
         <div className="loading-wrapper-centered">
            <Loading width={50} height={50} />
            <h4 className="has-text-white">Loading...</h4>
         </div>
      )
   }

   return (
      <div>
         <BoxGenre data={genresMovie}>
            {genresMovie.map(genre => (
               <BoxGenreItem key={genre.id}>
                  <Link 
                     to={`/genres/${genre.id}-${genre.name.toLowerCase().replace(' ','-')}`} 
                     className="box-genre-item-value">
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