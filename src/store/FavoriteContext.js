import React, { useEffect, useState } from 'react';

export const FavoriteContext = React.createContext();

export function FavoriteProvider({ children }) {
   const initialMovies = JSON.parse(window.localStorage.getItem("favorite-movies")) || [];
   const initialPeoples = JSON.parse(window.localStorage.getItem("favorite-peoples")) || [];
   const [movieFavorites, setMovieFavorites] = useState(initialMovies);
   const [peopleFavorites, setPeopleFavorites] = useState(initialPeoples);

   useEffect(() => {
      // console.log("local storage is updated");
      window.localStorage.setItem("favorite-movies", JSON.stringify(movieFavorites));
      window.localStorage.setItem("favorite-peoples", JSON.stringify(peopleFavorites));
   }, [movieFavorites, peopleFavorites]);

   const addFavoriteMovie = (payload) => {
      setMovieFavorites(movies => [...movies, payload]);
      alert("Movie Has Been Added in Favorites");
   };

   const addFavoritePeople = (payload) => {
      setPeopleFavorites(peoples => [...peoples, payload]);
      alert("People Has Been Added in Favorites");
   };

   return (
      <FavoriteContext.Provider value={{
         state: {
            movieFavorites,
            peopleFavorites,
         },
         addFavoriteMovie,
         addFavoritePeople,
      }}>
         {children}
      </FavoriteContext.Provider>
   );
};