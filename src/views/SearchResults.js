import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CardLayout from 'components/CardLayout';
import { MoviePoster, PeoplePoster } from 'components/Poster';
import { useQueryParams } from 'utils';
import API from 'services/movies';
import Loading from 'components/Loading';

export default function SearchResults() {
   const history = useHistory();
   const { location } = history;
   const [searchResults, setSearchResults] = useState([]);
   const [pageNumber, setPageNumber] = useState(1);
   const [isLoadMore, setLoadMore] = useState(false);
   const getParams = useQueryParams(useLocation().search).get("query");

   // resetting
   useEffect(() => {
      if(location.state.fromSearchSubmit) {
         setSearchResults([]);
      }
   }, [location]);

   useEffect(() => {
      const getSearch = async () => {
         setLoadMore(true);
         const response = await API.getSearch(getParams, pageNumber);
         setSearchResults(prevState => [...prevState, ...response.results]);
         setLoadMore(false);
      };

      getSearch();
   }, [pageNumber, getParams]);

   const loadMoreSearchResults = () => {
      setPageNumber(prevState => prevState + 1);
   };

   if(!searchResults || searchResults.length < 1) {
      return (
         <div className="loading-wrapper-centered">
            <Loading width={50} height={50} />
            <h4 className="has-text-white">Loading...</h4>
         </div>
      )
   }

   return (
      <div>
         <CardLayout title={`Search Results For: "${getParams}" [${searchResults.length}]`}>
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

            <div style={{ textAlign: 'center' }}>
               <button className={`button ${isLoadMore ? 'is-loading' : ''}`} 
                  onClick={() => loadMoreSearchResults()}>
                  {isLoadMore ? 'Loading...' : 'Load More'}
               </button>
            </div>
         </CardLayout>
      </div>
   )
};