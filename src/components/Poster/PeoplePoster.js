import React from 'react';
import { imgURL } from 'contants';
import { Link } from 'react-router-dom';

export default function PeoplePoster({ peopleID, profileImage, name }) {
   return (
      <div className="card-poster is-people">
         <Link to={`people/${peopleID}`} className="anchor-link">
            <img src={`https://image.tmdb.org/t/p/w185/${profileImage}`} alt={name} />
            <div className="poster-info-wrapper">
                  <h5 className="is-size-6 cp-title">{name}</h5>
            </div>
         </Link>
      </div>
   )
};