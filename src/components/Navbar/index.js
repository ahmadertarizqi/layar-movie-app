import React,  { useState } from 'react';
import * as Icon from 'react-feather';

export default function Navbar({ toggleSidebar, searchSubmit }) {
   const [inputValue, setInputValue] = useState('');
   const [isDeleteTerm, setDeleteTerm] = useState(false);
   
   const onFormSubmit = (ev) => {
      ev.preventDefault();
      searchSubmit(inputValue);
   };

   const onDeleteTermInput = () => {
      setInputValue('');
      setDeleteTerm(false);
   };

   return (
      <header>
         <nav className="navbar-wrapper">
            <div className="navbar-action-left">
               <button className="button btn-side-toggle" onClick={() => toggleSidebar()}><Icon.Menu /></button>
            </div>
            <div className="navbar-action-right">
               <form className="form-searchbar" onSubmit={onFormSubmit}>
                  <div className="control form-custom">
                     <Icon.Search className="icon-search" />
                     <input 
                        className="input" 
                        type="text"
                        value={inputValue}
                        onChange={(ev) => {
                           setInputValue(ev.target.value);
                           setDeleteTerm(true);
                        }}
                        placeholder="Search for a movie, or person..." 
                     />
                     {isDeleteTerm 
                        ? <Icon.XCircle onClick={onDeleteTermInput} className="icon-clear" />
                        : null
                     }
                  </div>
               </form>
            </div>
         </nav>
      </header>
   );
}