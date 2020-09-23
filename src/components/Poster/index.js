import React from 'react';
import { imgURL } from 'constants/index';
import { Link, useLocation } from 'react-router-dom';
import * as Icon from 'react-feather';
import dayjs from 'dayjs';

export default function Poster({ detailId, poster, title, releaseDate, rating }) {
   const location = useLocation();
   const currentUrl = location.pathname.split('/');

   let tempLink;
   switch (currentUrl[2]) {
      case 'movies':
         tempLink = '/movie';
         break;
      case 'tvshows':
         tempLink = '/tvshows';
         break;
      default:
         tempLink = '/movie';
         break;
   };

   return (
      <div className="column is-2 is-6-mobile card-poster">
         <Link to={`${tempLink}/${detailId}`} className="anchor-link">
            <img src={`${imgURL + poster}`} className="img-poster" alt={title} />
            <h5 className="is-size-6 cp-title">{title}</h5>
            <div className="poster-info">
               <div className="date-year">{dayjs(releaseDate).format('YYYY')}</div>
               <div className="rating">
                  <Icon.Star className="star" color="#f1c40f" fill="#f1c40f" size={16} /> 
                  <span className="rating-val">{rating}</span>
               </div>
            </div>
         </Link>
      </div>
   )
};