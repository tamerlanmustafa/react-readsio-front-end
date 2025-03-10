import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';
import './Dashboard.css';
import logo from '../../assets/logo.png';
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      } 
    }   
    if (user) fetchUsers();
  }, [user]);
  

  return (
    <main className='dashboard'>
      <h1>Hey, {user.username[0].toUpperCase() + user.username.slice(1).toLowerCase()}</h1>
      <div className="container">
        <div className="intro-to-readsio">
       
          <div className="logo">
            <img src={logo} alt="logo" width="200px" />  
            <h1>Readsio</h1>
          </div>

          <p>
            Explore, Review, and Manage books effortlessly! A seamless way to browse an extensive collection of books across various genres, view detailed information about each title, and contribute personal reviews to help fellow readers make informed decisions.
          </p>
          
          </div>
      </div>

      <Link to={'/books'}>See all books</Link>
    </main>
  );
};

export default Dashboard;
