import logo from './logo.svg';
import './App.css';
import Todo from './Todo/Todo';

function App() {
  return (
    <div>
    <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      {/* <h1 className="logo me-auto"><a href="index.html">Mentor</a></h1> */}
     <a href="index.html" className="logo me-auto"><img src="assets/img/baseball/logo.jpg" alt="" className="img-fluid" /></a>

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

        <div className="row" data-aos="zoom-in" data-aos-delay="100">

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="course-item">
              <img src="assets/img/course-1.jpg" className="img-fluid" alt="..."/>
              <div className="course-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>#2</h4>
                  <p className="price">$169</p>
                </div>

                <h3><a href="course-details.html">Bobby Johnson</a></h3>
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

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div className="course-item">
              <img src="assets/img/course-2.jpg" className="img-fluid" alt="..."/>
              <div className="course-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>#8</h4>
                  <p className="price">$250</p>
                </div>

                <h3><a href="course-details.html">Carter Anderson</a></h3>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div className="trainer d-flex justify-content-between align-items-center">
                  <div className="trainer-profile d-flex align-items-center">
                    <img src="assets/img/trainers/trainer-2.jpg" className="img-fluid" alt=""/>
                    <span>Sample</span>
                  </div>
                  <div className="trainer-rank d-flex align-items-center">
                    <i className="bx bx-user"></i>&nbsp;35
                    &nbsp;&nbsp;
                    <i className="bx bx-heart"></i>&nbsp;42
                  </div>
                </div>
              </div>
            </div>
          </div> 

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div className="course-item">
              <img src="assets/img/course-3.jpg" className="img-fluid" alt="..." />
              <div className="course-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>#10</h4>
                  <p className="price">$180</p>
                </div>

                <h3><a href="course-details.html">Easton Poast</a></h3>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div className="trainer d-flex justify-content-between align-items-center">
                  <div className="trainer-profile d-flex align-items-center">
                    <img src="assets/img/trainers/trainer-3.jpg" className="img-fluid" alt=""/>
                    <span>Brandon</span>
                  </div>
                  <div className="trainer-rank d-flex align-items-center">
                    <i className="bx bx-user"></i>&nbsp;20
                    &nbsp;&nbsp;
                    <i className="bx bx-heart"></i>&nbsp;85
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

        <Todo />
        
    </div>
  );
}

export default App;
