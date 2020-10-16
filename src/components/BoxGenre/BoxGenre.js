import React from 'react';
import PropTypes from 'prop-types';

export default function BoxGenre({ children, data, className }) {
   let isOverflow = '';
   if(data) {
      isOverflow = data.length > 10 ? 'row-overflow-horizontal' : '';
   }
   return (
      <div className={`
         box-genre-wrapper 
         ${isOverflow} 
         ${className ? className : ''}
      `}>
         {children}
      </div>
   )
};

BoxGenre.propTypes = {
   data: PropTypes.array,
   styleName: PropTypes.string
};