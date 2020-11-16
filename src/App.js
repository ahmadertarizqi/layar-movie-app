import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import NavigationRoute from './_nav';
import 'styles/main.scss';

import Routes from './routes';
import { FavoriteContext } from 'store/FavoriteContext';

export default function App() {
  const favorites = useContext(FavoriteContext);
  const { 
    state: { movieFavorites, peopleFavorites }
 } = favorites;

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-closed');
  }

  return (
    <React.Fragment>
      <Sidebar navigation={NavigationRoute} favoriteTotal={movieFavorites.length + peopleFavorites.length} />
      <div className="main-wrapper">
        <Navbar toggleSidebar={toggleSidebar} />
        <Switch>
          {Routes.map((route, idx) => {
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
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </React.Fragment>
  );
};
