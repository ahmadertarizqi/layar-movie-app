import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';

export default function Sidebar({ navigation, favoriteTotal }) {
   const location = useLocation();
   const renderedSideMenu = navigation.map(nav => {
      const currentUrl = location.pathname.split('/');
      const isActive = (currentUrl[1] === nav.name.toLowerCase().replace(' ','')) ? 'is-active' : '';

      return (
         <li className={`sidebar-menu-item ${isActive}`} key={nav.name}>
            <Link to={nav.link}>
               {nav.icon} <span>{nav.name}</span>
               {favoriteTotal > 0 
                  ? nav.name === 'Favorites' && <div className="badge-count">{favoriteTotal}</div>
                  : null
               }
            </Link>
         </li>
      );
   });

   return (
      <aside>
         <nav className="sidebar-wrapper">
            <div className="sidebar-logo">
               <div className="movie-logo">
                  <Icon.Play />
               </div>
            </div>
            <ul className="sidebar-menu">
               {renderedSideMenu}
            </ul>
         </nav>
      </aside>
   )
};

Sidebar.propTypes = {
   navigation: PropTypes.array.isRequired,
   favoriteTotal: PropTypes.number
}