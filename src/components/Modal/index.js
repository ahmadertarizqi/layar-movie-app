import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ opened, onClose, children }) {
   const style = {
      zIndex: '600'
   };

   return (
      <div className={`modal ${opened ? 'is-active' : '' }`} style={opened ? style : null}>
         <div className="modal-background"></div>
         <div className="modal-content modal-content-customized">
            {children}
         </div>
         <button className="modal-close is-large" 
            aria-label="close" 
            onClick={() => {
               onClose();
               document.documentElement.style.overflow = 'initial';  
            }}
         >
         </button>
      </div>
   )
};

Modal.propTypes = {
   opened: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   children: PropTypes.element
};
