import logo from './logo.svg';
import './App.css';
import {db} from './firebase';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const addTodo = async (e) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          todo: todo,    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

const fetchPost = async () => {
   
    await getDocs(collection(db, "todos"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                console.log(newData)
            setTodos(newData);                
            console.log(todos, newData);
        })
   
}

useEffect(()=>{
    fetchPost();
}, [fetchPost])

    const team = [
      {
      name: 'Bobby Johnson',
      number: 2
    },
      {
      name: 'Carter Anderson',
      number: 8
    },
      {
      name: 'Easton Post',
      number: 10
    },
      {
      name: 'Emerson Nuñez',
      number: 13
    },
      {
      name: 'Jack Peteler',
      number: 3
    },
      {
      name: 'Jackson Chidester',
      number: 23
    },
      {
      name: 'Michael Wittry',
      number: 12
    },
      {
      name: 'Parker Allen',
      number: 7
    },
      {
      name: 'Rex Rosseter',
      number: 9
    },
      {
      name: 'Vincent Cummings III',
      number: 5
    },
  
  ]



  return (
    <div>
    <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      {/* <h1 className="logo me-auto"><a href="index.html">Mentor</a></h1> */}
     <a href="index.html" className="logo me-auto"><img src="./img/baseball/logo.jpg" alt="" className="img-fluid" /></a>

      <nav id="navbar" className="navbar order-first order-lg-0">
        <ul>
          <li><a className="active" href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
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

      <a href="courses.html" className="get-started-btn">Get Started</a>

    </div>
  </header>
  <section id="hero" className="d-flex justify-content-center align-items-center">
  
    <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
      <h1>Omaha Warriors<br/>Baseball</h1>
      {/* <h2>We are team of talented designers making websites with Bootstrap</h2> */}
      <a href="courses.html" className="btn-get-started">Get Started</a>
    </div>
  </section>
  <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Players</h2>
          <p>Support our Team</p>
        </div>

        <div className="row d-flex justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          {team.map((player, i) =>
          <div className="col-lg-3 col-md-3 d-flex align-items-stretch justify-content-center mb-5">
            <div className="course-item">
              <img src="./img/75378.jpeg" className="img-fluid" alt="..."/>
              <div className="course-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>#{player.number}</h4>
                  <p className="price">$169</p>
                </div>

                <h3><a href="course-details.html">{player.name}</a></h3>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div className="trainer d-flex justify-content-between align-items-center">
                  <div className="trainer-profile d-flex align-items-center">
                    <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt=""/>
                    <span>Antonio</span>
                  </div>
                  <div className="trainer-rank d-flex align-items-center">
                    <i className="bx bx-user"></i>&nbsp;50
                    &nbsp;&nbsp;
                    <i className="bx bx-heart"></i>&nbsp;65
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          )}
          

        </div>

      </div>
    </section>
        
    </div>
  );
}

export default App;
