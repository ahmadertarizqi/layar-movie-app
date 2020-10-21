import React from 'react';
import PropTypes from 'prop-types';

export default function CardLayout({ children, title, withAction, className }) {
   return (
      <div className={`card-wrapper ${className}`}>
         <div className="cw-header">
            <h2 className="is-size-4 cw-header-title">{title}</h2>
            {withAction && <div className="cw-header-action">{withAction}</div>}
         </div>
         <div className="cw-body">{children}</div>
      </div>
   )
};

CardLayout.propTypes = {
   title: PropTypes.string,
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]),
   withAction: PropTypes.element,
   className: PropTypes.string
};

CardLayout.defaultProps = {
   className: ""
};