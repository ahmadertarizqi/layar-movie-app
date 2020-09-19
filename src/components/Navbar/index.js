import React from 'react';
import * as Icon from 'react-feather';

export default function Navbar({ toggleSidebar }) {
   return (
      <header>
         <nav className="navbar-wrapper">
            <div className="navbar-action-left">
               <button className="button btn-side-toggle" onClick={() => toggleSidebar()}><Icon.Menu /></button>
            </div>
            <div className="navbar-action-right">
               <form className="form-searchbar">
                  <div className="control form-custom">
                     <Icon.Search className="icon-search" />
                     <input className="input" type="text" placeholder="Search for a movie, tv show, person..." />
                  </div>
               </form>
            </div>
         </nav>
      </header>
   );
}