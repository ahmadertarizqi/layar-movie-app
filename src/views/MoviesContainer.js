import React, { useEffect, useState } from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';

const menuTabs = [
   {
      name: 'Popular',
      link: '/popular'
   },
   {
      name: 'Now Playing',
      link: '/now_playing'
   },
   {
      name: 'Top Rated',
      link: '/top_rated'
   },
   {
      name: 'Upcoming',
      link: '/upcoming'
   }
];

export default function Movies(props) {
   const { 
      match, 
      routes 
   } = props;

   const [showTabs, setShowTabs] = useState(false);
   const location = useLocation();
   const currentUrl = location.pathname.split('/');

   const renderedMenuTabs = menuTabs.map(tabs => {
      const isActive = (currentUrl[2] === tabs.link.substr(1)) ? 'is-active' : '';
      return (
         <li className={isActive} key={tabs.name}>
            <Link to={{
               pathname: `${match.path + tabs.link}`
            }}>{tabs.name}</Link>
         </li>
      );
   });

   useEffect(() => {
      menuTabs.map(tabs => {
         if(currentUrl[2] === tabs.link.substr(1)) {
            setShowTabs(true);
         }
         return tabs;
      });

      return () => {
         setShowTabs(false);
      };
   });

   return (
      <div className="movies-wrapper">
         {showTabs && (
            <div className="tabs tabs-custom">
               <ul>
                  {renderedMenuTabs}
               </ul>
            </div>
         )}
         <Switch>
            {routes.map((route, idx) => {
               return route.component
               ? (
                  <Route key={idx} 
                     path={route.path} 
                     exact={route.exact}
                     render={(props) => (
                        <route.component {...props} routes={route.routes} /> 
                     )} 
                  />
               ) : null
            })}
            <Redirect from={match.path} to={`${match.path + menuTabs[0].link}`} />
         </Switch>
      </div>
   )
};