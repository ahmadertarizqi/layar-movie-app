import React from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';

const menuTabs = [
   {
      name: 'Now Playing',
      link: '/nowplaying'
   },
   {
      name: 'Popular',
      link: '/popular'
   },
   {
      name: 'Top Rated',
      link: '/toprated'
   },
   {
      name: 'Upcoming',
      link: '/upcoming'
   }
];

export default function Movies(props) {
   const { 
      match: { path }, 
      routes 
   } = props;

   const location = useLocation();

   const renderedMenuTabs = menuTabs.map(tabs => {
      const currentUrl = location.pathname.split('/');
      const isActive = (currentUrl[2] === tabs.link.substr(1)) ? 'is-active' : '';
      return (
         <li className={isActive} key={tabs.name}>
            <Link to={`${path + tabs.link}`}>{tabs.name}</Link>
         </li>
      );
   });

   return (
      <div className="movies-wrapper">
         <div className="tabs tabs-custom">
            <ul>
               {renderedMenuTabs}
            </ul>
         </div>
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
            <Redirect from={path} to={`${path}/nowplaying`} />
         </Switch>
      </div>
   )
};