import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import dayjs from 'dayjs';
import { getImage } from 'utils';

export default function MoviePoster({ detailId, poster, title, releaseDate, rating }) {
   return (
      <div className="card-poster">
         <Link to={`/movie/${detailId}`} className="anchor-link">
            <img src={`${getImage('movie') + poster}`} className="img-poster" loading="lazy" alt={title} />
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