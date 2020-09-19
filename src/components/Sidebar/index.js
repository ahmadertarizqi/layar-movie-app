import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Sidebar({ navigation }) {
   return (
      <aside>
         <nav className="sidebar-wrapper">
            <div className="sidebar-logo">Logo</div>
            <ul className="sidebar-menu">
               {navigation.map(nav => (
                  <li className="sidebar-menu-item" key={nav.name}>
                     <Link to={nav.link}>{nav.icon} <span>{nav.name}</span></Link>
                  </li>                  
               ))}
            </ul>
         </nav>
      </aside>
   )
};

Sidebar.propTypes = {
   navigation: PropTypes.array.isRequired
}