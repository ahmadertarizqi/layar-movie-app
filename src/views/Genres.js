import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CardLayout from 'components/CardLayout';
import Poster from 'components/Poster'
import API from 'services/movies';

export default function Genres(props) {
   const { state } = props.location;
   const { genreID } = useParams();
   // const query = useQueryParams(useLocation().search);
   const [movies, setMovies] = useState([]);
   const [genreList, setGenreList] = useState([]);
   const [genreChange, setGenreChange] = useState(genreID);
   const [currentGenre, setCurrentGenre] = useState(state.currentGenrePage);
   const [numberPage, setNumberPage] = useState(1);

   useEffect(() => {
      const getGenre = async () => {
         const results = await API.getGenreMovie();
         setGenreList(results);
      };
      getGenre();
   }, []);

   useEffect(() => {
      let isCancelled = false;
      const getMoviesByGenre = async () => {
         try {
            const response = await API.getMoviesByGenre(genreChange, numberPage);
            if(!isCancelled) {
               setMovies((prevMovies) => [...prevMovies, ...response.results]);
            }
         } catch (error) {
            throw error;
         }
      };
      getMoviesByGenre();

      // unmount
      return () => {
         isCancelled = true;
      };
   }, [genreChange, numberPage]);

   const selectGenreChange = (ev) => {
      let temp = {};
      genreList.forEach(genre => {
         if(genre.id === parseInt(ev.target.value)) {
            temp = genre;
         } else {
            return genre;
         }
      });
      setGenreChange(temp.id);
      setCurrentGenre(temp.name);
      setNumberPage(1);
      setMovies([]);
   };

   const loadMoreMovies = () => {
      setNumberPage((prevNumberPage) => prevNumberPage + 1);
   };

   if(!movies || movies.length < 1) return <div>Loading....</div>

   return (
      <div className="movies-wrapper">
         <CardLayout 
            title={`Genre Movie: ${currentGenre}`}
            withAction={
               <div className="select select-customized">
                  <select value={genreChange} onChange={selectGenreChange} >
                     {genreList.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                           {genre.name}
                        </option>
                     ))}
                  </select>
               </div>
            }
         >
            <div className="columns is-multiline">
               {movies.map(movie => (
                  <div className="column is-one-fifth" key={movie.id}>
                     <Poster
                        detailId={movie.id}
                        poster={movie.poster_path}
                        title={movie.title}
                        releaseDate={movie.release_date}
                        rating={movie.vote_average}
                     />
                  </div>
               ))}
            </div>
            <div style={{ textAlign: 'center' }}>
               <button className={`button`} onClick={() => loadMoreMovies()}>
                  Load More
                  {/* {isLoadMore ? 'Loading...' : 'Load More'} */}
               </button>
            </div>
         </CardLayout>
      </div>
   )
};