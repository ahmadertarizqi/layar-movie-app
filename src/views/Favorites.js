import React, { useContext } from 'react';
import { FavoriteContext } from 'store/FavoriteContext';

function Favorites() {
   const favorites = useContext(FavoriteContext);
   const { state } = favorites;
   console.log(favorites);
   console.log(state);

   return (
      <div>
         <h3>Favorites</h3>
         <p>Movie Favorites : {state.movieFavorites.length} </p>
         <p>People Favorites : {state.peopleFavorites.length} </p>
      </div>
   )
}

export default Favorites;