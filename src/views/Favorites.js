import React, { useContext } from 'react';
import { FavoriteContext } from 'store/FavoriteContext';

function Favorites() {
   const favorites = useContext(FavoriteContext);
   console.log(favorites);

   return (
      <div>
         <h3>Favorites</h3>
      </div>
   )
}

export default Favorites;