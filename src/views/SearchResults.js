import React, { useContext } from 'react';
import { SearchContext } from 'store/SearchContext';

export default function SearchResults() {
   const searchConsumer = useContext(SearchContext);
   const { 
      state: { searchResults } 
   } = searchConsumer;
   console.log(searchResults);

   if(!searchResults || searchResults.length < 1) {
      return <div>Maaf, harus masukkan kata kunci</div>
   }

   return (
      <div>
         {searchResults.map((result, idx) => {
            switch(result.media_type) {
               case 'movie':
                  return <div key={idx}>Movie: {result.title}</div>
               case 'person':
                  return <div key={idx}>Person: {result.name}</div>
               default:
                  return '';
            }
         })}
      </div>
   )
};