import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import API from 'services/movies';
import MovieList from './MovieList';

export default function MoviesCategory() {
   const { movieCategory } = useParams();

   const [movies, setMovies] = useState([]);
   const [pageNumber, setPageNumber] = useState(1);
   const [isLoadMore, setIsLoadMore] = useState(false);
   const [isFirstRender, setIsFirstRender] = useState(true);

   const getMovies = async (page, categoryPage) => {
      setIsLoadMore(true);
      let response = await API.getMovies(page, categoryPage);
      setMovies((prevMovies) => [...prevMovies, ...response.results]);
      setIsLoadMore(false);
   };
   
   /**
    * reset state page on change page
    */
   useEffect(() => {
      // console.log('resetting');
      setMovies([]);
      if(isFirstRender) {
         setIsFirstRender(false);
      }

      if(pageNumber === 1 && !isFirstRender) {
         getMovies(pageNumber, movieCategory)
      } else {
         setPageNumber(1);
      }
      // eslint-disable-next-line
   }, [movieCategory]);


   useEffect(() => {
      getMovies(pageNumber, movieCategory);
      // eslint-disable-next-line
   }, [pageNumber]);

   const loadMoreMovies = useCallback(() => {
      setPageNumber(pageNumber + 1);
   }, [pageNumber]);

   return (
      <div className="card-wrapper">
         <MovieList 
            title={`${movieCategory.replace('_', ' ')}`}
            movies={movies}
            isLoadMore={isLoadMore}            
            loadMoreMovies={loadMoreMovies}
         />
      </div>
   )
};