import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { collection,  getDocs,  doc, getDoc,  updateDoc } from "firebase/firestore";
function Player() {
  const { num } = useParams();
  const [player, setPlayer] = useState('')
  const [data, setData] = useState({})
  const [pledgeType, setPledgeType] = useState(null)
  const [error, setError]= useState('')
  const updateType = e => {
    setPledgeType(e.target.value)
    setIsSuccess(false)
    setIsError(false)
  }
  const ref = useRef(null);
  const [isSuccess, setIsSuccess] = useState(null)
  const [isError, setIsError] = useState(null)
  const updateData = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    setIsSuccess(false)
    setIsError(false)
  }

  function isValid(data) {
    const textValid = /<([A-Za-z_{}()@/]+(\s|=)*)+>(.*<[A-Za-z/>]+)*/gi
    const phoneValid = /^\d{3}-\d{3}-\d{4}$/
    const pledge = Number(data?.pledge)
   if(!phoneValid.test(data.phone)){
      setError('Please enter a valid phone number')
    } else if (isNaN(pledge)){
      setError('Please enter a valid amount for your pledge')
    } else{
      return true;
    }
    return false
  }
  const [rawPhoneNumber, setRawPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  const formatPhoneNumber = (event) => {
    const inputValue = event.target.value;
    setRawPhoneNumber(inputValue);
    const formattedValue = formatAsPhoneNumber(inputValue);
    setFormattedPhoneNumber(formattedValue);
    data.phone = formattedValue
  };

  const formatAsPhoneNumber = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    const areaCode = value?.slice(0, 3)
    const firstNum = value?.slice(3, 6)
    const secondNum = value?.slice(6)
    if (areaCode.length === 3 && firstNum.length === 3 && secondNum.length === 4) {
      value = value?.slice(0, 3) + '-' + value?.slice(3, 6) + '-' + value?.slice(6);
    }
    return value;
  };
  const submitPledge = async (evt) => {
    evt.preventDefault()
    if (isValid(data)) {
      //  window.open('https://account.venmo.com/u/OWBPoast')
      try {
        const playerData = await getDoc(doc(db, "players", player.name))
        const playerDataObj = playerData.data()
        data.pledgeType = pledgeType
        data.player = player.name

        if (playerDataObj) {
          playerDataObj.pledges.push(data)
          await updateDoc(doc(db, "players", player.name), playerDataObj);
          setPlayer(playerDataObj)
        }

        setIsSuccess(true)
        setIsError(false)
      } catch (e) {
        setIsSuccess(false)
        setIsError(true)
      }
    } else {
      setIsSuccess(false)
      setIsError(true)
    }
  }

  const fetchPost = async () => {

    await getDocs(collection(db, "players"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        const playerInfo = newData.find(item => item.number == num)
        setPlayer(playerInfo);

      })

  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPost();
  }, [])


  return <main id="main">
    <div className="breadcrumbs" data-aos="fade-in" style={{ background: '#E10203' }}>
      <div className="container">
        <h2><strong>{player.name}</strong></h2>

      </div>
    </div>
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-3 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src={player?.photo ?? ''} className="img-fluid" alt="" />
          </div>

          <div className="col-lg-9 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <p>{player?.bio ?? ''}</p>
            <h3>Current Pledges</h3>

            <p className="fst-italic">
              Thank you to those who have made a pledge for {player.name}
            </p>
            <ul>
              {player?.pledges?.length === 0 ?? 'No Pledges Yet'}
              {
                player?.pledges?.map((pledge, i) =>
                  <li key={i}><i className="bi bi-check-circle"></i> {pledge.name} has pledged ${pledge.pledge}{pledge.pledgeType}</li>)
              }
            </ul>


          </div>
        </div>

      </div>
    </section>
    <section id="counts" className="counts section-bg">
      <div className="container">
        <div className="row counters">
          <div className="col-lg-4 col-6 text-center">
            <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" className="purecounter">{player?.pledges?.filter(pledge => pledge.pledgeType === "/foot").length}</span>
            <p>Total Pledges Per Foot</p>
          </div>

          <div className="col-lg-4 col-6 text-center">
            <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" className="purecounter">{player?.pledges?.filter(pledge => pledge.pledgeType === "/hit").length}</span>
            <p>Total Pledges Per Hit</p>
          </div>

          <div className="col-lg-4 col-6 text-center">
            <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" className="purecounter">{player?.pledges?.filter(pledge => pledge.pledgeType === " ").length}</span>
            <p>Total Pledges By Amount</p>
          </div>



        </div>

      </div>
    </section>
    <section id="contact" className="contact" ref={ref}>

      <div className="container" data-aos="fade-up">

        <div className="row mt-5 d-flex justify-content-center">
          <h2 className='text-center'>Pledge for {player?.name}</h2>


          <div className="col-lg-8 mt-5 mt-lg-0">

            <form onSubmit={submitPledge} role="form" className="php-email-form" >
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Name" title="Please enter a name" maxLength="55" required onChange={updateData} />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="text" className="form-control" name="venmo" id="venmo" title="Please enter your Venmo username" maxLength="30" placeholder="Venmo Username" onChange={updateData} />
                  <div class="form-text" id="basic-addon4"><input className="form-check-input" type="checkbox" value="" id="defaultCheck1" style={{height:'1em'}} /> Check this box if you don't use venmo and we'll send an invoice.</div>
                 
                 
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="email" name="email" className="form-control" id="email" placeholder="Email" maxLength="50" required onChange={updateData} />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input className="form-control"
                    type="text"
                    value={formattedPhoneNumber}
                    onChange={formatPhoneNumber}
                    placeholder="Enter Phone Number"
                  />
                 </div>
              </div>
              <select class="form-select" name="pledgeType" aria-label="Default select example" onChange={updateType} required>
                <option selected={null}>Choose Pledge Type</option>
                <option value="/hit">Per Hit</option>
                <option value="/foot">Per Foot</option>
                <option value=" ">Amount</option>
              </select>
              <div className="input-group mt-3 d-flex justify-content-center" style={{ width: '500px', margin: '0 auto' }}>
                <span className="input-group-text">Amount to Pledge: $</span>
                <input type="number" className="form-control" name="pledge" step="any" aria-label="Amount (to the nearest dollar)" onChange={updateData} required disabled={pledgeType === null} />
                <span className="input-group-text">{pledgeType}</span>
              </div>

              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit" disabled={isSuccess}>{isSuccess ? 'Thank you for your pledge':'PLEDGE!'}</button></div>
            </form>
            {isSuccess && <div class="alert alert-success mt-5" role="alert">
              Pledge Successfully Submitted
            </div>
            }
            {isError && <div class="alert alert-danger  mt-5" role="alert">
              There is a problem with your form submission: {error}
            </div>}
          </div>

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
        
        </div>
      </footer>
  </main>
}


export default Player;