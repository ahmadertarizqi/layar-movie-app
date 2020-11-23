import React, { useState } from 'react';

export const SearchContext = React.createContext();

export function SearchProvider({ children }) {
   const [searchResults, setSearchResults] = useState([]);
   
   const updateSearchResults = (payload) => {
      setSearchResults(payload);
   };

   return (
      <SearchContext.Provider value={{
         state: { searchResults },
         updateSearchResults,
      }}>
         {children}
      </SearchContext.Provider>
   )
};