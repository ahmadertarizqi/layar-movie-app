import React from 'react';
import PropTypes from 'prop-types';

export default function CardLayout({ children, title, withAction }) {
   return (
      <div className="card-wrapper">
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
   children: PropTypes.element,
   withAction: PropTypes.element
};