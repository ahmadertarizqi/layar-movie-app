import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from 'services/movies';
import { imgURL } from 'constants/index';
import * as Icon from 'react-feather';
import dayjs from 'dayjs';
import { findValueByJob, timeConvert } from 'utils'

export default function MovieDetail(props) {
   const { movieID } = useParams();
   const [movieDetail, setMovieDetail] = useState({});

   useEffect(() => {
      const getMovieDetail = async () => {
         const response = await API.getMovie(movieID);
         setMovieDetail(response.data);
      };

      getMovieDetail();
   }, [movieID]);

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
      if(movieDetail.production_companies) {
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

   return (
      <div className="detail-content">
         <div className="header-content" style={{ backgroundImage: `url(${imgURL + movieDetail.backdrop_path})` }}>
            <button className="button btn-go-back" onClick={() => props.history.goBack()}>
               <Icon.ArrowLeft /> <span>Back to main</span>
            </button>
            <div className="columns is-multiline">
               <div className="column is-3 card-poster">
                  <img className="img-poster" src={`${imgURL + movieDetail.poster_path}`} alt={movieDetail.title} />
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
                                    <Link to={`/${genre.name}`}>{genre.name}</Link>
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
                           <button className="button is-rounded">
                              <Icon.Play fill="#002068" color="#002068" /> Watch Trailer
                           </button>
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
      </div>
   );
};