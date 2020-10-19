import React, { useEffect, useState } from 'react';
import API from 'services/movies';
import { Link } from 'react-router-dom';
// import HomeBanner from 'components/HomeBanner';
import CardLayout from 'components/CardLayout';
import Poster from 'components/Poster';
import { BoxGenre, BoxGenreItem } from 'components/BoxGenre';
import UserAvatar from 'components/UserAvatar';
import TrendingMovieList from './TrendingMovieList';
import TrendingPeopleList from './TrendingPeopleList';

export default function Browse() {
   const [genresMovie, setGenresMovie] = useState([]);
   const [trendingMovie, setTrendingMovie] = useState([]);
   const [trendingPeople, setTrendingPeople] = useState([]);
   const [timeCategory, setTimeCategory] = useState('day');

   useEffect(() => {
      const getGenre = async () => {
         const response = await API.getGenreMovie();
         setGenresMovie(response.genres);
      };
      getGenre();

      const getTrendingPeople = async () => {
         const response = await API.getTrending('person');
         console.log("people");
         console.log(response);
         setTrendingPeople(response.results);
      };

      getTrendingPeople();
   }, []);

   useEffect(() => {
      const getTrendingMovie = async () => {
         const response = await API.getTrending('movie', timeCategory);
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
         
         <div className="columns">
            <div className="column is-8">
               <TrendingMovieList movies={trendingMovie} />
            </div>
            <div className="column is-4">
               <TrendingPeopleList peoples={trendingPeople} />
            </div>
         </div>
      </div>
   )
};