import React, { useState } from 'react';

export const FavoriteContext = React.createContext();

export function FavoriteProvider({ children }) {
   const [movieFavorites] = useState([]);
   const [peopleFavorites] = useState([]);

   const state = {
      movieFavorites,
      peopleFavorites,
   };

   return (
      <FavoriteContext.Provider value={state}>
         {children}
      </FavoriteContext.Provider>
   );
};