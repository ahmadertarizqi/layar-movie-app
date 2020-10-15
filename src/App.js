import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import NavigationRoute from './_nav';
import 'styles/main.scss';

import Routes from './routes';

export default function App() {
  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-closed');
  }

  return (
    <React.Fragment>
      <Sidebar navigation={NavigationRoute} />
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
          <Redirect from="/" to="/browse" />
        </Switch>
      </div>
    </React.Fragment>
  );
};
