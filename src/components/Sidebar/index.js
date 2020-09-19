import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';

export default function Sidebar() {
   return (
      <aside>
         <nav className="sidebar-wrapper">
            <div className="sidebar-logo">Logo</div>
            <ul className="sidebar-menu">
               <li className="sidebar-menu-item">
                  <Link to="/"><Icon.Home/> <span>Home</span></Link>
               </li>
               <li className="sidebar-menu-item">
                  <Link to="/movies"><Icon.Film/> <span>Movies</span></Link>
               </li>
               <li className="sidebar-menu-item">
                  <Link to="/tvshows"><Icon.Tv/> <span>TV Shows</span></Link>
               </li>
               <li className="sidebar-menu-item">
                  <Link to="/favorites"><Icon.Heart/> <span>Favorites</span></Link>
               </li>
            </ul>
         </nav>
      </aside>
   )
}