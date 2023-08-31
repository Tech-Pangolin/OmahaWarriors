
import './App.css';
import logo from './logo.jpg'
import { db } from './firebase';
import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, runTransaction, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import easton from './players/easton.jpg'
import emerson from './players/emerson.jpg'
import jack from './players/jack.jpg'
import jackson from './players/jackson.jpg'
import mason from './players/mason.jpg'
import michael from './players/michael.jpg'
import parker from './players/parker.jpg'
import vincent from './players/vincent.jpg'
import mainImage from './75378.jpeg'

function Home() {
  const [data, setData] = useState({})
  const [teamData, setTeamData] = useState([])
  const [pledgeType,setPledgeType]=useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const team = [
    {
      name: 'Bobby J',
      number: 2, 
      photo: logo
    },
    {
      name: 'Carter A',
      number: 8, 
      photo: logo
    },
    {
      name: 'Easton P',
      number: 10,
      bio:`Easton has been playing baseball since he was 6 years old.  He loves pitching and playing 1st base.  He wears the number 10, just like his dad did.  When he isn't on the field, he enjoys playing video games and spending time with his teammates.  Easton's favorite subject in school is social studies and he wants to be a teacher when he grows up.`,
      photo: easton
    },
    {
      name: 'Emerson N',
      number: 13,
      bio: `Emerson's preferred positions are shortstop, catcher, pitcher and outfield.
      Emerson loves baseball because he likes everything about it.
      Other activities Emerson likes and enjoys: football, basketball and video games.
      Favorite teams: San Diego Padres, the Milwaukee Bucks.`,
      photo:emerson
    },
    {
      name: 'Jack P',
      number: 3, 
      photo: jack
    },
    {
      name: 'Jackson C',
      number: 23,
      photo:jackson,
      bio:`Baseball is life! A utility player who loves the infield, the pitcher's mound, and being behind the plate. Known for his speed and ability to steal bases. Loves all things sports including Husker football and the Buffalo Bills.`
    },
    {
      name: 'Karson M',
      number: 44,
      bio:``, 
      photo: logo
    },
    {
      name: 'Mason L',
      number: 24,
      photo:mason,
      bio:`Youth baseball players always have fun whether it be on the field with the players or with their walk-up song.
 My name is Mason. I am 12 years old soon to be 13:)   I LOVE BASEBALL!!!  I have played sports for five years. By far baseball is my favorite. My most liked positions to play is 3rd base and pitching. I have made the All-Star team two years in a row.
     My favorite MLB baseball player is Elly De La Cruz. 
      My favorite MLB team is the Cincinnati Reds
      I like milk shakes, gaming, and fishing.
     Every day might not be a good day but there is good in every day!`
    },
    {
      name: 'Michael W',
      number: 12,
      photo:michael,
      bio:` Favorite position(s): Outfield, infield…I’m happy as long as I am on the field.
        Why I love baseball: Baseball provides the perfect mix of the physical and mental. Plus, I enjoy competition.
        Other Activities I Enjoy: Running, Band, Reading, Playing video games
        Favorite Team: Minnesota Twins`
    },
    {
      name: 'Parker A',
      number: 7, 
      bio:`Parker's favorite positions are playing pitcher, first & center field. Parker has been playing baseball since he was 4 years old! He loves the game & has really started making moves over the past couple of years. He also plays basketball & is currently running cross country at his school.  When Parker isn't busy with his sporting activities, he enjoys hanging out with his friends & also playing xbox.`,
      photo: parker
    },
    {
      name: 'Rex R',
      number: 9, 
      photo: logo
    },
    {
      name: 'Vincent C',
      number: 5, 
      bio: `Hi my name Vincent and my favorite positions are shortstop, pitcher, second base, outfield, catcher and third base. I really like learning and playing baseball. I play soccer, bowling and like camping and hiking with my scout troop.`,
      photo: vincent
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
          photo:player?.photo ?? logo,
          bio: player?.bio ?? '',
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
            <div className='text-end'>
            <Link to="/pledges" className="active">View Pledges (Admin)</Link>
             {/* <button onClick={populatePlayers}>Populate Players</button> */}
              </div>
           
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