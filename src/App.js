
import './App.css';
import logo from './logo.jpg'

import React from 'react';
import RoutesComponent from './RoutesComponent'

function App() {

  return (
    <div>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
       
          <a href="/" className="logo me-auto"><img src={logo} alt="" className="img-fluid" /></a>
 </div>
      </header>
      <RoutesComponent />
      
    </div>
  );
}

export default App;
