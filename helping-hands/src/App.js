import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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