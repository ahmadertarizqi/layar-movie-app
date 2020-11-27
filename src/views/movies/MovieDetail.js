import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from 'services/movies';
import { MOVIE_CONSTANT, youtubeEmbed } from '../../contants';
import * as Icon from 'react-feather';
import dayjs from 'dayjs';
import { chunkArray, findValueByJob, getImage, timeConvert } from 'utils'
import UserAvatar from 'components/UserAvatar';
import { MoviePoster } from 'components/Poster';
import Modal from 'components/Modal';
import CardLayout from 'components/CardLayout';
import { toast } from 'react-toastify';

import { FavoriteContext } from 'store/FavoriteContext';

export default function MovieDetail(props) {
   const { movieID } = useParams();
   const [movieDetail, setMovieDetail] = useState({});
   const [isOpen, setIsOpen] = useState(false);

   const favoriteStore = useContext(FavoriteContext);
   const {
      state: { movieFavorites }, 
      addToFavorite,
   } = favoriteStore;

   useEffect(() => {
      const getMovieDetail = async () => {
         const response = await API.getMovie(movieID);
         setMovieDetail(response);
      };
      
      getMovieDetail();
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
   }, [movieID]);

   const handleCloseModal = () => {
      setIsOpen(false);
   };

   const addToFavoriteHandler = (payload) => {
      const movieArr = [...movieFavorites];
      const findIdx = movieArr.findIndex(movie => movie.id === payload.id);
      // check if exist from localstorage
      if(findIdx === -1) {
         addToFavorite(MOVIE_CONSTANT, payload);
         toast.info("Added movie to favorites list",{
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      } else {
         toast.info("Movie is already", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   };

   const renderCredits = () => {
      if (movieDetail.credits) {
         const director = findValueByJob('Director', movieDetail.credits.crew);
         const writer = findValueByJob('Writer', movieDetail.credits.crew);
         return (
            <React.Fragment>
               <div className="info-credits">
                  <div className="item">
                     <h6 className="text-title is-size-6">Director</h6>
                     <p>{director ? director.name : '--'}</p>
                  </div>
                  <div className="item">
                     <h6 className="text-title is-size-6">Writer</h6>
                     <p>{writer ? writer.name : '--'}</p>
                  </div>
               </div>
            </React.Fragment>
         );
      }
   };

   const renderProductions = () => {
      if (movieDetail.production_companies) {
         return (
            <React.Fragment>
               <h6 className="text-title is-size-6">Production Companies</h6>
               <p>
                  {movieDetail.production_companies.length > 0 ?
                     movieDetail.production_companies.map(company => company.name).join(', ')
                     : '--'
                  }
               </p>
            </React.Fragment>
         )
      }
   };

   const renderCast = () => {
      const creditsCast = chunkArray(movieDetail.credits.cast, 2);
      return (
         <React.Fragment>
            <CardLayout title="Cast">
               <div className="row-overflow-horizontal">
                  <div className="columns">
                     {creditsCast.map((cast, idx) => (
                        <div className="column is-3" key={idx}>
                           {cast.map(val => (
                              <Link to={`/people/${val.id}`} key={val.id} className="is-block has-text-white">
                                 <UserAvatar
                                    photo={val.profile_path}
                                    castName={val.name}
                                    characterName={val.character}
                                 >
                                    <h6 className="text-title is-size-7">Name</h6>
                                    <p className="cast-name">{val.name ? val.name : '--'}</p>
                                    <div className="divider"></div>
                                    <h6 className="text-title is-size-7">Character</h6>
                                    <p className="character-name">{val.character ? val.character : '--'}</p>
                                 </UserAvatar>
                              </Link>
                           ))}
                        </div>
                     ))}
                  </div>
               </div>
            </CardLayout>
         </React.Fragment>
      )
   };

   const renderSimilarMovies = () => {
      const { results: movies } = movieDetail.similar;
      if(movies.length > 0) {
         return (
            <CardLayout title="Similar Movies">
               <div className="row-overflow-horizontal">
                  <div className="columns">
                     {movies.map(movie => (
                        <div className="column is-one-fifth" key={movie.id}>
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
               </div>
            </CardLayout>
         )
      }
   };

   const renderVideoTrailer = () => {
      const { results: trailer } = movieDetail.videos;
      if(trailer.length > 0) {
         return (
            <Modal opened={isOpen} onClose={handleCloseModal}>
               <div className="trailer-preview">
                  <iframe 
                     title={trailer[0].name} 
                     width="100%" 
                     height="500"
                     src={`${youtubeEmbed}/${trailer[0].key}?autoplay=${isOpen ? 1 : 0}`}
                     allowFullScreen
                  ></iframe>
               </div>
            </Modal>
         )
      }
   };

   return (
      <div className="detail-content">
         <div className="header-content" style={{ backgroundImage: `url(${getImage('backdrop') + movieDetail.backdrop_path})` }}>
            <button className="button btn-go-back" onClick={() => props.history.push('/movies')}>
               <Icon.ArrowLeft /> <span>Back to main</span>
            </button>
            <div className="columns is-multiline">
               <div className="column is-3 card-poster">
                  <img className="img-poster without-info" src={`${getImage('movie') + movieDetail.poster_path}`} alt={movieDetail.title} />
               </div>
               <div className="column is-9">
                  <div className="movie-description">
                     <span className="date-year">{dayjs(movieDetail.release_date).format('YYYY')}</span>
                     <h3 className="text-title is-size-3">{movieDetail.title}</h3>
                     <nav className="breadcrumb has-bullet-separator genres-list">
                        <ul>
                           {movieDetail.genres ? (
                              movieDetail.genres.map(genre => (
                                 <li key={genre.id}>
                                    <Link to={`/genres/${genre.id}-${genre.name.toLowerCase().replace(' ','-')}`}>
                                       {genre.name}
                                    </Link>
                                 </li>
                              ))
                           ) : null}
                        </ul>
                     </nav>
                     <div className="info-additional">
                        <div className="item rating">
                           <Icon.Star className="symbol rating" color="#f1c40f" fill="#f1c40f" />
                           <span>{movieDetail.vote_average}</span>
                        </div>
                        <div className="item runtime">
                           <Icon.Clock className="symbol" /> <span>{timeConvert(movieDetail.runtime)}</span>
                        </div>
                        <div className="item">
                           <button 
                              className="button is-rounded" 
                              onClick={() => { 
                                 setIsOpen(true); 
                                 document.documentElement.style.overflow = 'hidden';
                              }}
                           >
                              <Icon.Play fill="#002068" color="#002068" /> Watch Trailer
                           </button>
                        </div>
                        <div className="item">
                           <button onClick={() => addToFavoriteHandler(movieDetail)}>Add To Favorites</button>
                        </div>
                     </div>
                     <h5 className="text-title is-size-5">Overview</h5>
                     <div className="overview">
                        <p>{movieDetail.overview}</p>
                     </div>
                     {renderCredits()}
                     {renderProductions()}
                  </div>
               </div>
            </div>
         </div>
         <div className="body-content">
            {movieDetail.credits && (
               renderCast()
            )}
            <div className="mb-6"></div>
            {movieDetail.similar && (
               renderSimilarMovies()
            )}
            {movieDetail.videos && (
               renderVideoTrailer()
            )}
         </div>
      </div>
   );
};