import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from 'assets/placeholder-user.png';
import { getImage } from 'utils';

export default function Avatar({ photo, name }) {
   return (
      <figure className="image img-source-wrap">
         {photo 
            ? <img className="img-source" src={`${getImage('people') + photo}`} alt={name} />
            : <img className="img-source" src={defaultImage} alt="default_image" />
         }
      </figure>
   )
};

Avatar.propTypes = {
   photo: PropTypes.string,
   characterName: PropTypes.string
};