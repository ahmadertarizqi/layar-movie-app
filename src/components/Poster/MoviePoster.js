import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import dayjs from 'dayjs';
import { getImage } from 'utils';
import ImgPlaceholder from 'assets/image-placeholder.png';

export default function MoviePoster({ detailId, poster, title, releaseDate, rating }) {
   return (
      <div className="card-poster">
         <Link to={`/movie/${detailId}`} className="anchor-link">
            {poster ? 
               <figure className="image is-2by3">
                  <img src={`${getImage('movie') + poster}`} className="img-poster" loading="lazy" alt={title} />
               </figure>
               : 
               <figure className="image is-2by3">
                  <img src={ImgPlaceholder} className="img-poster" loading="lazy" alt="img-placeholder" />
               </figure>
            }
            <div className="poster-info-wrapper">
               <h5 className="is-size-6 cp-title">{title}</h5>
               <div className="poster-info">
                  <div className="date-year">{dayjs(releaseDate).format('YYYY')}</div>
                  <div className="rating">
                     <Icon.Star className="star" color="#f1c40f" fill="#f1c40f" size={16} />
                     <span className="rating-val">{rating}</span>
                  </div>
               </div>
            </div>
         </Link>
      </div>
   )
};