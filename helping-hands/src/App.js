import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import client from './Apollo';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';
import Schools from './components/pages/Schools.js';



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div claassName= "App">
          <Navbar />
       {/* <Login /> */}
          
          <Routes>
            <Route  path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route  path="/profile" element={<Profile/>} />
            <Route  path="/schools" element={<Schools/>} />
            <Route  path="/" element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;