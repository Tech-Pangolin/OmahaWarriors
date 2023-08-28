
import './App.css';
import logo from './logo.jpg'
import { db } from './firebase';
import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, runTransaction, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import mainImage from './75378.jpeg'

function Home() {
  const [data, setData] = useState({})
  const [teamData, setTeamData] = useState([])
  const [pledgeType,setPledgeType]=useState(null)
  const [isLoading, setIsLoading]= useState(false)
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

  const clearSelections = () => {
    console.log('clear it')
  }
  const populatePlayers = async () => {


    for (let player of team) {
      try {
        await setDoc(doc(db, "players", player.name), {
          name: player.name,
          number: player.number,
          pledges: []
        });
      } catch (e) {
        console.log(e)
      }
    }
  }

  const updateData = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const updateType = e =>{
    setPledgeType(e.target.value)
  }
  const ref = useRef(null);

  const [selectedPlayer, setSelectedPlayer] = useState('Omaha Warriors')
  const fetchPost = async () => {

    const querySnapshot = await getDocs(collection(db, "players"))
    const newData = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));
    setTeamData(newData)


  }

  useEffect(() => {
    fetchPost();
  }, [])

  const handleClick = (player) => {

    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setSelectedPlayer(player.name)
  };

  const submitPledge = async (evt) => {
    evt.preventDefault()
    setIsLoading(true)
    console.log('submit!')
    console.log(data)
    const player = {
      name: selectedPlayer,

    }
    //  window.open('https://account.venmo.com/u/OWBPoast')
    try {
      console.log(selectedPlayer)
      const playerData = await getDoc(doc(db, "players", selectedPlayer))
      const playerDataObj = playerData.data()
      console.log(playerDataObj)
      data.pledgeType = pledgeType
      if (playerDataObj) {
        playerDataObj.pledges.push(data)
        await updateDoc(doc(db, "players", selectedPlayer), playerDataObj);
       // setIsLoading(false)
      }

    } catch (e) {
      console.log(e)
    }

 
  }

  //https://account.venmo.com/u/OWBPoast


 

  return (
    <div>
      <section id="hero" className="d-flex justify-content-center align-items-center">

        <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
          <h1>Omaha Warriors<br />Baseball</h1>
          {/* <h2>We are team of talented designers making websites with Bootstrap</h2> */}
          {/* <a href="courses.html" className="btn-get-started">Get Started</a> */}
        </div>
      </section>
      <section id="popular-courses" className="courses">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Players</h2>
            <p>Support our Team</p>
          </div>
          {/* <button onClick={populatePlayers}>Populate Players</button> */}
          <div className="row d-flex justify-content-center" data-aos="zoom-in" data-aos-delay="100">
            {teamData?.map((player, i) =>
              <div key={i} className="col-lg-3 col-md-3 d-flex align-items-stretch justify-content-center mb-5">
                <div className="course-item">
                <Link to={`player/${player.number}`}><img src={mainImage} className="img-fluid" alt="..." /></Link>
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>#{player.number}</h4>
                    
                    </div>

                    <h3> <Link to={`player/${player.number}`}>{player.name}</Link></h3>
                    <p>Pledges by Foot:  {player?.pledges?.filter(pledge=>pledge.pledgeType==="/foot").length}</p> 
                    <p>Pledges by Hit:  {player?.pledges?.filter(pledge=>pledge.pledgeType==="/hit").length}</p> 
                    <p>Pledges by Amount:  {player?.pledges?.filter(pledge=>pledge.pledgeType===" ").length}</p> 
                    <div className="trainer d-flex justify-content-center align-items-center">
                    <Link to={`player/${player.number}`}><button type="button" className="btn btn-success">Pledge for {player.name}</button></Link>
                      {/* <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="" />
                        <span>Antonio</span>
                      </div>
                      <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;50
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;65
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>


            )}


          </div>

        </div>
      </section>
      {/* <section id="contact" className="contact" ref={ref}>

        <div className="container" data-aos="fade-up">

          <div className="row mt-5 d-flex justify-content-center">
            <h2 className='text-center'>Pledge for {selectedPlayer}</h2>


            <div className="col-lg-6 mt-5 mt-lg-0">

              <form onSubmit={submitPledge} role="form" className="php-email-form" >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Name" required onChange={updateData} />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="text" className="form-control" name="venmo" id="venmo" placeholder="Venmo Username" required onChange={updateData} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="email" name="email" className="form-control" id="email" placeholder="Email" required onChange={updateData} />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Phone Number" required onChange={updateData} />
                  </div>
                </div>
                <select class="form-select" name="pledgeType" aria-label="Default select example" onChange={updateType}>
                  <option selected>Choose Pledge Type</option>
                  <option value="/hit">Per Hit</option>
                  <option value="/foot">Per Foot</option>
                  <option value=" ">Amount</option>
                </select>
                <div className="input-group mt-3 d-flex justify-content-center" style={{ width: '500px', margin: '0 auto' }}>
                  <span className="input-group-text">Amount to Pledge: $</span>
                  <input type="text" className="form-control" name="pledge" aria-label="Amount (to the nearest dollar)" onChange={updateData} />
                  <span className="input-group-text">{pledgeType}</span>
                </div>

                <div className="my-3">{isLoading.toString()}
                  {isLoading ? (<div>Loading</div>) : ''}
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center"><button type="submit">PLEDGE!</button></div>
              </form>

            </div>

          </div>

        </div>
      </section> */}

    </div>
  );
}

export default Home;