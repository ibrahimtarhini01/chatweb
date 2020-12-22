import React, { Fragment } from 'react';

//Design
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';

// layout
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';

// Auth
import Account from './components/auth/Account';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path='/'
            component={() => (
              <Container
                Component={Account}
                size='container px-0 px-sm-3 mt-5'
              />
            )}
          />
          <Route
            exact
            path='/account'
            component={() => (
              <Container
                Component={Account}
                size='container px-0 px-sm-3 mt-5'
              />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
