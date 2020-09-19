import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

export default function Movies(props) {
   const { 
      match: { path }, 
      routes 
   } = props;

   return (
      <div className="movies-wrapper">
         <div className="tabs tabs-custom">
            <ul>
               <li className="is-active">
                  <Link to={`${path}/nowplaying`}>Now Playing</Link>
               </li>
               <li>
                  <Link to={`${path}/popular`}>Popular</Link>
               </li>
               <li>
                  <Link to={`${path}/toprated`}>Top Rated</Link>
               </li>
               <li>
                  <Link to={`${path}/upcoming`}>Upcoming</Link>
               </li>
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