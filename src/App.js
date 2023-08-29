
import './App.css';
import logo from './logo.jpg'
import {db} from './firebase';

import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, runTransaction, doc,getDoc,setDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import RoutesComponent from './RoutesComponent'

function App() {

 return (
    <div>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          {/* <h1 className="logo me-auto"><a href="index.html">Mentor</a></h1> */}
          <a href="https://tech-pangolin.github.io/OmahaWarriors/" className="logo me-auto"><img src={logo} alt="" className="img-fluid" /></a>

          <nav id="navbar" className="navbar order-first order-lg-0">
            <ul>
             {/* <li><a className="active" href="https://tech-pangolin.github.io/OmahaWarriors/pledges">View Pledges</a></li> */}
               {/* <li><a href="about.html">About</a></li> */}
              {/* <li><a href="courses.html">Courses</a></li>
          <li><a href="trainers.html">Trainers</a></li>
          <li><a href="events.html">Events</a></li>
          <li><a href="pricing.html">Pricing</a></li>

          <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><a href="contact.html">Contact</a></li> */}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          {/* <a href="courses.html" className="get-started-btn">Get Started</a> */}

        </div>
      </header>
     <RoutesComponent />
    </div>
  );
}

export default App;
