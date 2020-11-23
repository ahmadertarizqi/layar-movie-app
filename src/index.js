import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { FavoriteProvider } from 'store/FavoriteContext';
import { SearchProvider } from 'store/SearchContext';

ReactDOM.render(
  <React.StrictMode>
    <FavoriteProvider>
      <SearchProvider>
        <Router>
          <App />
        </Router>
      </SearchProvider>
    </FavoriteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
