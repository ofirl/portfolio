import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";

import RouteManager from './components/RouteManager/RouteManager';

import './App.css';

function App() {
  return (
    <Router>
      <RouteManager />
    </Router>
  );
}

export default App;
