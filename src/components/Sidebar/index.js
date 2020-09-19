import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Sidebar({ navigation }) {
   const location = useLocation();
   const renderedSideMenu = navigation.map(nav => {
      const currentUrl = location.pathname.split('/');
      const isActive = (currentUrl[1] === nav.name.toLowerCase().replace(' ','')) ? 'is-active' : '';

      return (
         <li className={`sidebar-menu-item ${isActive}`} key={nav.name}>
            <Link to={nav.link}>{nav.icon} <span>{nav.name}</span></Link>
         </li>
      );
   });

   return (
      <aside>
         <nav className="sidebar-wrapper">
            <div className="sidebar-logo">Logo</div>
            <ul className="sidebar-menu">
               {renderedSideMenu}
            </ul>
         </nav>
      </aside>
   )
};

Sidebar.propTypes = {
   navigation: PropTypes.array.isRequired
}