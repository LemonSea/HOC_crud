import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/global-style.css';
import { Provider } from 'react-redux';
import  store  from './store/index';
import Login from './pages/login';
import Main from './pages/main';

// import { store, persistor } from './store/index';
// import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor} > */}
        <Router>
          <Route path='/login' component={Login}></Route>
          <Route path='/' exact component={Main}></Route>
        </Router>
        {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
