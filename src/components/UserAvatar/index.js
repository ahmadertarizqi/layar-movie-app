import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

export default function UserAvatar({ children, photo, castName, className }) {
   return (
      <div className={`media user-avatar ${className}`}>
         <div className="media-left">
            <Avatar photo={photo} name={castName} />
         </div>
         <div className="media-content">
            {children}
         </div>
      </div>
   )
};

UserAvatar.propTypes = {
   photo: PropTypes.string,
   castName: PropTypes.string.isRequired,
   characterName: PropTypes.string
};