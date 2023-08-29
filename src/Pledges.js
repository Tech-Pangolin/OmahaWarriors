import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, getDocs, runTransaction, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

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
            }).catch(err=>
                alert('incorrect login'))
    }
    function signOut() {
       
                sessionStorage.setItem('Auth Token',null)
                setShowPledges(false)
          
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