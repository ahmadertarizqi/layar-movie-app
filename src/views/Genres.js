import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardLayout from 'components/CardLayout';
import { MoviePoster } from 'components/Poster'
import API from 'services/movies';
import Loading from 'components/Loading';

export default function Genres() {
   const { genreID } = useParams();
   const splitGenre = genreID.split("-");
   const currentGenreName = splitGenre.slice(1).join(" ");
   const [movies, setMovies] = useState([]);
   const [genreList, setGenreList] = useState([]);
   const [genreChange, setGenreChange] = useState(splitGenre[0]);
   const [currentGenre, setCurrentGenre] = useState(currentGenreName);
   const [numberPage, setNumberPage] = useState(1);
   const [isLoadMore, setLoadmore] = useState(false);

   useEffect(() => {
      const getGenre = async () => {
         const results = await API.getGenreMovie();
         setGenreList(results);
      };
      getGenre();
   }, []);

   useEffect(() => {
      let isCancelled = false;
      setLoadmore(true);
      const getMoviesByGenre = async () => {
         try {
            const response = await API.getMoviesByGenre(genreChange, numberPage);
            if(!isCancelled) {
               setMovies((prevMovies) => [...prevMovies, ...response.results]);
               setLoadmore(false);
            }
         } catch (error) {
            setLoadmore(false);
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

   if(!movies || movies.length < 1) {
      return (
         <div className="loading-wrapper-centered">
            <Loading width={50} height={50} />
            <h4 className="has-text-white">Loading...</h4>
         </div>
      )
   }

   return (
      <div className="movies-wrapper">
         <CardLayout 
            title={`Genre Movie: ${currentGenre} (${movies.length})`}
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
            <div className="columns is-multiline is-mobile">
               {movies.map(movie => (
                  <div className="column is-half-mobile is-one-third-tablet is-one-fifth-desktop" key={movie.id}>
                     <MoviePoster
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
               <button className={`button${isLoadMore ? ' is-loading': ''} `} onClick={() => loadMoreMovies()}>
                  {isLoadMore ? 'Loading...' : 'Load More'}
               </button>
            </div>
         </CardLayout>
      </div>
   )
};