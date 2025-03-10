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
        </div>

        <div className="signing-on-landing">
            <Link to='/sign-in'>SIGN IN</Link>
            <Link className="sign-up" to='/sign-up'>SIGN UP</Link>
        </div>

        <h2>Features:</h2>
        <ul className="features">
          <li><strong>Browse Books:</strong> Search for books based on genres, authors, or titles and discover new reads from the database.</li>
          <li><strong>Book Details:</strong> View comprehensive book details, including genre, description, and author information.</li>
          <li><strong>Write Reviews:</strong> Share your feedback with others by submitting reviews and ratings. Reviews can be easily added or updated, giving users a chance to express their opinions and interact with the community.</li>
          <li><strong>Manage Reviews:</strong> Users can edit or delete their reviews, offering flexibility and control over their contributions.</li>
          <li><strong>Community Interaction:</strong> Engage with fellow readers by reading and interacting with reviews, offering a sense of community and shared experiences around books.</li>
        </ul>
        <hr />
        {/* <p>Readsio provides a comprehensive, well-organized space for book lovers to manage their reading journey and connect with like-minded individuals. Whether you're an avid reader, a casual browser, or someone looking to dive into a new book, Readsio is your go-to platform for everything book-related.</p> */}
      </div>
    </main>
  );
};

export default Landing;
