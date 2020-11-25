import React, { useContext, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
  
  const history = useHistory();
  const [redirectToSearch, setRedirectToSearch] = useState(false);

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-closed');
  }
  
  const onSearch = (keyword) => {
    setRedirectToSearch(true);
    if(!redirectToSearch) {
      history.push(`/search?query=${keyword}`);
    }
  };

  return (
    <React.Fragment>
      <Sidebar navigation={NavigationRoute} favoriteTotal={movieFavorites.length + peopleFavorites.length} />
      <div className="main-wrapper">
        <Navbar toggleSidebar={toggleSidebar} searchSubmit={onSearch} />
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
