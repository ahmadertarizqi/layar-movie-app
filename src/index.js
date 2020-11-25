import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { FavoriteProvider } from 'store/FavoriteContext';

import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(
  <React.StrictMode>
    <FavoriteProvider>
      <Router>
        <App />
      </Router>
    </FavoriteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
