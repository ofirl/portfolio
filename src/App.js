import React from 'react';

import { BrowserRouter as Router } from "react-router-dom";

import RouteManager from './components/RouteManager/RouteManager';

import SimpleReactLightbox from 'simple-react-lightbox'

import './App.css';
import './swiper.css';

function App() {
  return (
    <SimpleReactLightbox>
      <Router>
        <RouteManager />
      </Router>
    </SimpleReactLightbox>
  );
}

export default App;
