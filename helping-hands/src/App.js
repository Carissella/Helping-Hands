import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// import './App.css';
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
    <div className= "navbar">
          <Navbar />
          <div className='nav-container'>
          <Routes>
            { <Route exact path="/" component={Home} /> }
            { <Route exact path="/login" component={Login} /> }
            { <Route exact path="/signup" component={Signup} /> }
            { <Route exact path="/schools" component={Schools} /> }
          </Routes>
          </div>
        </div>
      </Router>
     </ApolloProvider>
  );
}

export default App;