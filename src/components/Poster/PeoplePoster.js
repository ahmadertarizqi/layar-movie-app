import React from 'react';
import { imgURL } from 'contants';

export default function PeoplePoster({ peopleID, profileImage, name }) {
   return (
      <div className="card-poster is-people">
         <img src={`${imgURL}/w185${profileImage}`} alt={name} />
         <div className="poster-info-wrapper">
            <h5 className="is-size-6 cp-title">{name}</h5>
         </div>
      </div>
   )
};