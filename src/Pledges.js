import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, getDocs, runTransaction, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import logo from './logo.jpg'
import easton from './players/easton.jpg'
import emerson from './players/emerson.jpg'
import jack from './players/jack.jpg'
import jackson from './players/jackson.jpg'
import mason from './players/mason.jpg'
import michael from './players/michael.jpg'
import parker from './players/parker.jpg'
import vincent from './players/vincent.jpg'

function Pledges() {
    const { num } = useParams();
    const [player, setPlayer] = useState('')
    const [data, setData] = useState({})
    const [pledgeType, setPledgeType] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [totalPledges, setTotalPledges] = useState([])
    console.log('test',sessionStorage.getItem('Auth Token'))
    const [showPledges, setShowPledges] = useState(sessionStorage.getItem('Auth Token') ? true : false)
console.log(showPledges)
    function signIn() {
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
               console.log(response)
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                setShowPledges(true)
            }).catch(err=>
                alert('incorrect login'))
    }
    function signOut() {
       
                sessionStorage.setItem('Auth Token',null)
                setShowPledges(false)
          
    }

    const populatePlayers = async () => {
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
              bio:` Favorite position(s): Outfield, infield…I'm happy as long as I am on the field.
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

    const updateType = e => {
        setPledgeType(e.target.value)
    }
    const ref = useRef(null);

    const [selectedPlayer, setSelectedPlayer] = useState('Omaha Warriors')
    const updateData = (e, playerObj) => {
        setData(e.target.value)
        playerObj.totalPledges = e.target.value * playerObj.pledge
        console.log(playerObj)
    }


    const fetchPost = async () => {

        await getDocs(collection(db, "players"))
            .then((querySnapshot) => {
                const pledges = [];
                console.log(querySnapshot)
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data() }));
                console.log(newData)
                for (let player of newData) {

                    pledges.push(...player?.pledges)
                }
                console.log(pledges)
                setTotalPledges(pledges)
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])
    const getTotalPledged = (pledge) => {
        // playerObj.totalPledges = e.target.value *playerObj.pledge
    }

    return <main id="main">
        <div className="breadcrumbs" data-aos="fade-in" style={{ background: '#E10203' }}>
            <div className="container">
                <h2><strong>Total Pledges</strong></h2>
                 {!showPledges ?<div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Email Address" aria-label="Email Address" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='col'>
                    <button type="submit" className="btn btn-primary" onClick={signIn}>Sign in</button>
                    </div>
                    </div>:  <button type="submit" className="btn btn-danger" onClick={signOut}>Sign Out</button>
                 
                 }
               
            </div>
        </div>
        {showPledges ? (<section id="about" className="about">
       {email ==='terra.taylor@gmail.com' && <button onClick={populatePlayers}>Reset Database</button>}
            <div className="container" data-aos="fade-up">

                <div className="row">
                    <div className='col-md-12'>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Player</th>
                                    <th scope="col">Pledged Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Pledge Type</th>
                                    <th scope="col">No of Hits/Feet</th>

                                    <th scope="col">Total Pledged</th>
                                    <th scope="col">Venmo</th>

                                </tr>
                            </thead>
                            <tbody>
                                {totalPledges?.map((player, i) =>
                                    <tr key={i}>
                                        <th scope="row">{player.player}</th>
                                        <td>{player.name}</td>
                                        <td>{player.phone}</td>
                                        <td>{player.pledge}{player.pledgeType}</td>
                                        <td><input type="number" name="noOfHitsFeet" onChange={(e) => updateData(e, player)} style={{ width: '100px' }} /></td>
                                        <td>{player?.pledgeType === ' ' ? player?.pledge : player?.totalPledges}</td>
                                        <td>{player?.venmo}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
        ):<h2 className='text-center my-5'>Sign in to see Pledge Records</h2>}
        <section id="counts" className="counts section-bg">
            <div className="container">

                <div className="row counters">

                    <div className="col-lg-4 col-6 text-center">
                        <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" className="purecounter">{totalPledges?.filter(pledge => pledge.pledgeType === "/foot").length}</span>
                        <p>Total Pledges Per Foot</p>
                    </div>

                    <div className="col-lg-4 col-6 text-center">
                        <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" className="purecounter">{totalPledges?.filter(pledge => pledge.pledgeType === "/hit").length}</span>
                        <p>Total Pledges Per Hit</p>
                    </div>

                    <div className="col-lg-4 col-6 text-center">
                        <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" className="purecounter">{totalPledges?.filter(pledge => pledge.pledgeType === " ").length}</span>
                        <p>Total Pledges By Amount</p>
                    </div>



                </div>

            </div>
        </section>


    </main>
}


export default Pledges;