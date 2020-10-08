import React from 'react';
import PropTypes from 'prop-types';
import { imgURL } from '../../contants';
import defaultImage from 'assets/placeholder-user.png';

export default function UserAvatar({ photo, castName, characterName }) {
   return (
      <div className="media user-avatar">
         <div className="media-left">
            <figure className="image img-source-wrap">
               {photo 
                  ? <img className="img-source" src={`${imgURL + photo}`} alt={characterName} />
                  : <img className="img-source" src={defaultImage} alt="default_image" />
               }
            </figure>
         </div>
         <div className="media-content">
            <h6 className="text-title is-size-7">Name</h6>
            <p className="cast-name">{castName ? castName : '--'}</p>
            <div className="divider"></div>
            <h6 className="text-title is-size-7">Character</h6>
            <p className="character-name">{characterName ? characterName : '--'}</p>
         </div>
      </div>
   )
};

UserAvatar.propTypes = {
   photo: PropTypes.string,
   castName: PropTypes.string.isRequired,
   characterName: PropTypes.string.isRequired
};