import React from 'react';
import { imgURL } from 'contants';
import PersonImgPlaceholder from 'assets/user-placeholder.png';

export default function PeoplePoster({ peopleID, profileImage, name }) {
   return (
      <div className="card-poster is-people">
         {profileImage ? 
            <figure className="image is-2by3">
               <img src={`${imgURL}/w185${profileImage}`} alt={name} />
            </figure>
            : 
            <figure className="image is-2by3">
               <img src={PersonImgPlaceholder} alt="img-default" />
            </figure>
         }
         <div className="poster-info-wrapper">
            <h5 className="is-size-6 cp-title">{name}</h5>
         </div>
      </div>
   )
};