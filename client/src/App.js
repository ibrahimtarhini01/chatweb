import React from 'react';

//Design
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';

// layout
import Container from './components/layout/Container';

// Auth
import Account from './components/auth/Account';
import Confirm from './components/auth/Confirm';
import Reset from './components/auth/Reset';
import ResetPassword from './components/auth/ResetPassword';
import Auth from './components/layout/Auth';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Auth />
        <Switch>
          <Route
            exact
            path='/'
            component={() => <Container Component={Account} size='' />}
          />
          <Route
            exact
            path='/account'
            component={() => <Container Component={Account} size='' />}
          />
          <Route exact path='/reset' component={Reset} />
          <Route exact path='/reset/:token' component={ResetPassword} />
          <Route exact path='/confirm/:token' component={Confirm} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
