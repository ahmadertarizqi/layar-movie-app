import React from 'react';
import { imgURL } from 'contants';
import PersonImgPlaceholder from 'assets/user-placeholder.png';

export default function PeoplePoster({ peopleID, profileImage, name }) {
   return (
      <div className="card-poster is-people">
         {profileImage 
            ? <img src={`${imgURL}/w185${profileImage}`} alt={name} />
            : <img src={PersonImgPlaceholder} alt="img-default" />
         }
         <div className="poster-info-wrapper">
            <h5 className="is-size-6 cp-title">{name}</h5>
         </div>
      </div>
   )
};