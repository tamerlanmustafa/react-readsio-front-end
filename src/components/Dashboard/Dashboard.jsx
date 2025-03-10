import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';
import './Dashboard.css';
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
      <div class="container">
        <h1>Readsio</h1>
        <p>Readsio is a dynamic and user-friendly app designed for avid readers who want to explore, review, and manage books effortlessly. It provides a seamless way for users to browse an extensive collection of books across various genres, view detailed information about each title, and contribute personal reviews to help fellow readers make informed decisions.</p>

        <p>The app allows users to register, log in, and create personalized profiles, making it easy to track their reading habits and interactions. Whether you're looking to add a new book to your virtual shelf or share your thoughts on a recently read novel, Readsio provides the tools to enhance your reading experience.</p>

        <h2>Features:</h2>
        <ul>
          <li><strong>Browse Books:</strong> Search for books based on genres, authors, or titles and discover new reads from the database.</li>
          <li><strong>Book Details:</strong> View comprehensive book details, including genre, description, and author information.</li>
          <li><strong>Write Reviews:</strong> Share your feedback with others by submitting reviews and ratings. Reviews can be easily added or updated, giving users a chance to express their opinions and interact with the community.</li>
          <li><strong>Manage Reviews:</strong> Users can edit or delete their reviews, offering flexibility and control over their contributions.</li>
          <li><strong>Personalized Dashboard:</strong> A central location where users can see a list of their added books, reviews, and personalized reading suggestions based on their preferences.</li>
          <li><strong>Community Interaction:</strong> Engage with fellow readers by reading and interacting with reviews, offering a sense of community and shared experiences around books.</li>
        </ul>

        <p>Readsio provides a comprehensive, well-organized space for book lovers to manage their reading journey and connect with like-minded individuals. Whether you're an avid reader, a casual browser, or someone looking to dive into a new book, Readsio is your go-to platform for everything book-related.</p>
      </div>

      <Link to={'/books'}>See all books</Link>
    </main>
  );
};

export default Dashboard;
