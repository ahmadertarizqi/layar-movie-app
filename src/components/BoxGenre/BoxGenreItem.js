import React from 'react';

export default function BoxGenreItem({ children, className }) {
   return <div className={`box-genre-item ${className ? className : ''}`}>{children}</div>
};