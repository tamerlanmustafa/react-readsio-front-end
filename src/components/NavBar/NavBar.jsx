import { useContext } from 'react';
import { Link } from 'react-router';
import './Navbar.css';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/logo.png';
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return ( 
    <nav>
      {user ? (
        <ul>
          <li><Link to='/'><img src={logo} alt="logo" width="50px" /></Link></li>
          <li><Link to='/books/new'>New book</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'><img src={logo} alt="logo" width="50px" /></Link></li>
            <div className="signing">
              <li><Link to='/sign-in'>SIGN IN</Link></li>
              
              <li><Link to='/sign-up'>SIGN UP</Link></li>
            </div>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
