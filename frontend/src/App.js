import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import client from './Apollo';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Schools from './pages/Schools.js';



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div claassName= "App">
          <Navbar />
          <Login />
          <Routes>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/schools" component={Schools} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;