import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './assets/global-style.css';
import { Provider } from 'react-redux';
import store from './store/index';
import Login from './pages/login';
import Main from './pages/main';
import NotFound from './pages/not-found/not-found';

// import { store, persistor } from './store/index';
// import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor} > */}
      <Router>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Main}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
