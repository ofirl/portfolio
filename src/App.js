import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";

import LandingPage from './components/LandingPage/LandingPage';
import ProjectsPage from './components/ProjectsPage/ProjectsPage';
import Technologies from './components/Technologies/Technologies';

import { useTransition, animated } from 'react-spring';

import './App.css';
import RouteManager from './components/RouteManager/RouteManager';

function App() {
  return (
    <Router>
      <RouteManager />
    </Router>
  );
}

export default App;
