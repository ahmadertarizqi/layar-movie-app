import React from 'react';
import { imgURL } from 'constants/index';

export default function Poster({ poster, title }) {
   return (
      <div className="column is-2 card-poster">
         <img src={`${imgURL + poster}`} alt={title} />
         <h5 className="is-size-6 cp-title">{title}</h5>
      </div>
   )
};