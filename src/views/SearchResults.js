import React, { useContext } from 'react';
import { SearchContext } from 'store/SearchContext';
import { Link } from 'react-router-dom';
import CardLayout from 'components/CardLayout';
import { MoviePoster, PeoplePoster } from 'components/Poster';

export default function SearchResults() {
   const searchConsumer = useContext(SearchContext);
   const { 
      state: { searchResults } 
   } = searchConsumer;
   console.log(searchResults);

   if(!searchResults || searchResults.length < 1) {
      return <div>Loading...</div>
   }

   return (
      <div>
         <CardLayout title={`Search Results For: ${searchResults.length}`}>
            <div className="columns is-multiline">
               {searchResults.map((result, idx) => {
                  switch(result.media_type) {
                     case 'movie':
                        return (
                           <div className="column is-one-fifth" key={idx}>
                              <MoviePoster 
                                 detailId={result.id}
                                 poster={result.poster_path}
                                 title={result.title}
                                 releaseDate={result.release_date}
                                 rating={result.vote_average}
                              />
                           </div>
                        )
                     case 'person':
                        return (
                           <div className="column is-one-fifth" key={idx}>
                              <Link to={`/people/${result.id}`} className="anchor-link">
                                 <PeoplePoster 
                                    peopleID={result.id}
                                    profileImage={result.profile_path}
                                    name={result.name}
                                 />
                              </Link>
                           </div>
                        )
                     default:
                        return '';
                  }
               })}
            </div>
         </CardLayout>
      </div>
   )
};