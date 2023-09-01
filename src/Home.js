
import './App.css';

import { db } from './firebase';
import React, { useState, useEffect} from 'react';
import { collection,  getDocs} from "firebase/firestore";
import { Link } from 'react-router-dom';
import mainImage from './75378.jpeg'

function Home() {
  const [teamData, setTeamData] = useState([]) 

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "players"))
    const newData = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));
    setTeamData(newData)
  }

  useEffect(() => {
    fetchPost();
  }, [])

 
 
  return (
    <div>
      <section id="hero" className="d-flex justify-content-center align-items-center">

        <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
          <h1>Omaha Warriors<br />Baseball</h1>
        </div>
      </section>
      <section id="popular-courses" className="courses">
        <div className="container" data-aos="fade-up">
          <div className='row'>
            <div className="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content text-center mb-5">
              <h3>We're holding a Hitathon to help raise money for our team.  This will help offset costs related to player and organizational fees, uniforms, and tournaments.  Every little bit helps!</h3>
              <p class="fst-italic">
                The Hitathon will be a fun way for the team to fundraise and show off their skills!
                We will hold the event on Sunday, September 17th from 12pm to 5pm at the baseball field in Elmwood Park.  We will also have a picnic where plates of food can be purchased - those funds will also go to the team. Once all players have completed their hits, there will be a pickup baseball game. Please feel free to come out and join us!

              </p>
              <p class="fst-italic">
                Each player will have 10 balls to hit like normal batting practice.  Their top two distances will be recorded and added together, along with how many total balls they hit of the 10 pitched to them.
              </p>
              <p class="fst-italic">
                A pledge can be made in three different ways:

              </p>
              <div className='text-start ml-5 d-flex flex-column align-items-center'>
              <ul style={{listStyle:'none', marginLeft:'10%'}}>
                <li><i class="bi bi-check-circle"></i> per ball hit, for up to 10 hits. <span className="fst-italic">(example: you pledge $1 per ball hit and the player hits 7, you would pay $7)</span></li>
                <li><i class="bi bi-check-circle"></i> per foot hit adding together their two longest distances hit. <span className="fst-italic">(example: you pledge $0.10 per foot and the player hits a total of 200 feet, you would pay $20)</span></li>
                <li><i class="bi bi-check-circle"></i> a flat amount.</li>
              </ul></div>
              <p class="fst-italic">
              Once the event is over, we'll send you an invoice for payment via your Venmo account, email, or text. 
              </p>
              <p class="fst-italic">
              Please use the links below to make a pledge for your player of choice!
              </p>
              <p class="fst-italic">
              Thank you for supporting our team!  We look forward to seeing you at the picnic or one of our baseball games in the spring!
              </p>
            </div>
          </div>
          <div className="section-title">

            <h2>Players</h2>
      

            <p>Support our Team</p>
            <h4>Please select the player you would like to support below:</h4>
          </div>

          <div className="row d-flex justify-content-center" data-aos="zoom-in" data-aos-delay="100">
            {teamData?.map((player, i) =>
              <div key={i} className="col-lg-3 col-md-3 d-flex align-items-stretch justify-content-center mb-5">
                <div className="course-item">
                  <Link to={`player/${player.number}`}><img src={player?.photo ?? mainImage} className="img-fluid" alt="..." /></Link>
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>#{player.number}</h4>

                    </div>

                    <h3> <Link to={`player/${player.number}`}>{player.name}</Link></h3>
                    <p>Pledges by Foot:  {player?.pledges?.filter(pledge => pledge.pledgeType === "/foot").length}</p>
                    <p>Pledges by Hit:  {player?.pledges?.filter(pledge => pledge.pledgeType === "/hit").length}</p>
                    <p>Pledges by Amount:  {player?.pledges?.filter(pledge => pledge.pledgeType === " ").length}</p>
                    <div className="trainer d-flex justify-content-center align-items-center">
                      <Link to={`player/${player.number}`}><button type="button" className="btn btn-success">Pledge for {player.name}</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>   
      <footer>
        <div className="container d-md-flex py-4">

          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; Copyright <strong><span>Omaha Warriors</span></strong>. All Rights Reserved | Site created by <a href="http://www.terrataylor.com" target="_blank" rel="noreferrer">TechPangolinLLC</a>
            </div>
            <div className='text-end'>
           
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0"> 
          <Link to="/pledges">View Pledges (Admins Only)</Link>
          </div>
        </div>
      </footer>   
    </div>
  );
}

export default Home;