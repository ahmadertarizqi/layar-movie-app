import React, { useContext } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import { ToastContainer } from 'react-toastify';
import NavigationRoute from './_nav';
import 'styles/main.scss';

import Routes from './routes';
import { FavoriteContext } from 'store/FavoriteContext';
import { Helmet } from 'react-helmet';
import FaviconIcon from 'assets/logo-icon.png';

export default function App() {
  const favorites = useContext(FavoriteContext);
  const { 
    state: { movieFavorites, peopleFavorites }
  } = favorites;
  
  const history = useHistory();

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-closed');
  }
  
  const onSearch = (keyword) => {
    history.push({
      pathname: '/search',
      search: `?query=${keyword}`,
      state: {
        fromSearchSubmit: true
      }
    });
  };

  return (
    <React.Fragment>
      <Helmet
        title="Layar Movie"
        link={[
          {"rel": "icon", "href": `${FaviconIcon}`, "type": "image/x-icon"}
        ]}
        meta={[
          {"charset": "utf-8"},
          {"name": "theme-color", "content": "#34495e"},
          {"name": "description", "content": "Layar Movie - TMDB"},
          {"name": "author", "content": "Ahmaderta Rizqi"}
        ]}
      />
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
      
      {/* react-toastify-container */}
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </React.Fragment>
  );
};
