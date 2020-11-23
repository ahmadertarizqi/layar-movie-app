import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import NavigationRoute from './_nav';
import 'styles/main.scss';

import Routes from './routes';
import { FavoriteContext } from 'store/FavoriteContext';
import { SearchContext } from 'store/SearchContext';
import API from 'services/movies';

export default function App() {
  const favorites = useContext(FavoriteContext);
  const searchConsumer = useContext(SearchContext);
  const { 
    state: { movieFavorites, peopleFavorites }
  } = favorites;
  const history = useHistory();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [redirectToSearch, setRedirectToSearch] = useState(false);

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-closed');
  }
  
  const onSearch = (keyword) => {
    setRedirectToSearch(true);
    setSearchKeyword(keyword);

    if(!redirectToSearch) {
      history.push('/search');
    }
  };
  
  useEffect(() => {
    const getSearch = async () => {
      const response = await API.getSearch(searchKeyword);
      searchConsumer.updateSearchResults(response.results);
    };

    if(redirectToSearch) {
      getSearch();
    }
    // unsubscribe redirect
    return () => setRedirectToSearch(false);
  }, [searchKeyword, redirectToSearch, searchConsumer]);

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
