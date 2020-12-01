import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, className, ...props }) {
   return (
      <button className={`button is-customized is-rounded ${className}`}
         {...props}
      >
         {children}
      </button>
   )
};

Button.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
   onClickHandler: PropTypes.func,
};

Button.defaultProps = {
   className: ''
};