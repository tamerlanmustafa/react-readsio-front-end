import "./Landing.css";
import  logo from  "../../assets/logo.png";
import { Link } from 'react-router';
const Landing = () => {
  return (
    <main>
      <div className="landing">
        <div className="intro-to-readsio">

          <div className="logo">
            <img src={logo} alt="logo" width="200px" />  
            <h1>Readsio</h1>
          </div>

          <p>
            Explore, Review, and Manage books effortlessly! A seamless way to browse an extensive collection of books across various genres, view detailed information about each title, and contribute personal reviews to help fellow readers make informed decisions.
          </p>
          
          <div className="signing-on-landing">
              <Link to='/sign-in'>SIGN IN</Link>
              <Link className="sign-up" to='/sign-up'>SIGN UP</Link>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Landing;
