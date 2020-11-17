import React, { useEffect, useState } from 'react';
import { MOVIE_CONSTANT, PEOPLE_CONSTANT } from 'contants';

export const FavoriteContext = React.createContext();

export function FavoriteProvider({ children }) {
   const initialMovies = JSON.parse(window.localStorage.getItem("favorite-movies")) || [];
   const initialPeoples = JSON.parse(window.localStorage.getItem("favorite-peoples")) || [];
   const [movieFavorites, setMovieFavorites] = useState(initialMovies);
   const [peopleFavorites, setPeopleFavorites] = useState(initialPeoples);

   useEffect(() => {
      console.log("local storage is updated");
      window.localStorage.setItem("favorite-movies", JSON.stringify(movieFavorites));
      window.localStorage.setItem("favorite-peoples", JSON.stringify(peopleFavorites));
   }, [movieFavorites, peopleFavorites]);

   const addFavoriteMovie = (payload) => {
      const newMovie = {
         id: payload.id,
         title: payload.title,
         release_date: payload.release_date,
         poster_path: payload.poster_path,
         rating: payload.vote_average,
      };
      setMovieFavorites(movies => [...movies, newMovie]);
      alert("Movie Has Been Added in Favorites");
   };

   const deleteFavoriteMovie = (id) => {
      let movieArr = [...movieFavorites];
      const findIdx = movieArr.findIndex(movie => movie.id === id); // OR ==> arr.map(data => data.id).indexOf(id);
      movieArr.splice(findIdx, 1);
      setMovieFavorites(movieArr);
   };

   const addFavoritePeople = (payload) => {
      const newPeople = {
         id: payload.id,
         profile_path: payload.profile_path,
         name: payload.name,
      };
      setPeopleFavorites(peoples => [...peoples, newPeople]);
      alert("People Has Been Added in Favorites");
   };

   const deleteFavoritePeople = (id) => {
      let peopleArr = [...peopleFavorites];
      const findIdx = peopleArr.findIndex(people => people.id === id);
      peopleArr.splice(findIdx, 1);
      setPeopleFavorites(peopleArr);
   };

   const addToFavorite = (favoriteType, payload) => {
      if(favoriteType === MOVIE_CONSTANT) {
         addFavoriteMovie(payload);
      } else if (favoriteType === PEOPLE_CONSTANT) {
         addFavoritePeople(payload);
      }
   };

   const deleteFromFavorite = (favoriteType, id) => {
      if(favoriteType === MOVIE_CONSTANT) {
         deleteFavoriteMovie(id);
      } else if (favoriteType === PEOPLE_CONSTANT) {
         deleteFavoritePeople(id);
      }
   };

   return (
      <FavoriteContext.Provider value={{
         state: {
            movieFavorites,
            peopleFavorites,
         },
         addToFavorite,
         deleteFromFavorite
      }}>
         {children}
      </FavoriteContext.Provider>
   );
};