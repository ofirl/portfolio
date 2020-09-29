import React from 'react';

import { BrowserRouter as Router } from "react-router-dom";

import RouteManager from './components/RouteManager/RouteManager';

import './App.css';
import './swiper.css';

function App() {
  return (
    <Router>
      <RouteManager />
    </Router>
  );
}

export default App;
