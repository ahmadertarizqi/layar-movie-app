import React, { useEffect, useState } from 'react';
import Favorites from 'views/Favorites';
import Home from 'views/Home';
import API from 'services/movies';
import { Route, Switch } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import 'styles/main.scss';
import Navbar from 'components/Navbar';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await API.getMoviesNowPlaying();
      setMovies(response.data.results);
    }
    getMovies();
  }, []);

  if (!movies.length > 0) {
    return <div>Loading...</div>
  }

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-closed');
  }

  return (
    <React.Fragment>
      <Sidebar />
      <div className="main-wrapper">
        <Navbar toggleSidebar={toggleSidebar} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
