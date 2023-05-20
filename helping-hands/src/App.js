import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {/* TODO: Add other routes here */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;