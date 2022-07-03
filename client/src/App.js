import React from 'react';
import { Route, Switch } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import './App.css'
import Error from './components/Error';
import Logout from './components/Logout';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route path='/contact' component={Contact} /> */}
        <Route path='/signup' component={Signup} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
