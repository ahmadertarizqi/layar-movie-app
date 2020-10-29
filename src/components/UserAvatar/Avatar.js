import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from 'assets/placeholder-user.png';
import { imgURL } from 'contants';

export default function Avatar({ photo, name }) {
   return (
      <figure className="image img-source-wrap">
         {photo 
            ? <img className="img-source" src={`${imgURL + photo}`} alt={name} />
            : <img className="img-source" src={defaultImage} alt="default_image" />
         }
      </figure>
   )
};

Avatar.propTypes = {
   photo: PropTypes.string,
   characterName: PropTypes.string
};