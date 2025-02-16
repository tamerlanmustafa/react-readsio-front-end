import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import BooksList from './components/BooksList/BooksList';
import BookDetails from './components/BookDetails/BookDetails';
import { UserContext } from './contexts/UserContext';

import * as bookService from './services/bookService';




const App = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const booksData = await bookService.index();
        console.log("booksData:", booksData); 
        setBooks(Array.isArray(booksData.books) ? booksData.books : []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    if (user) fetchAllBooks();
  }, [user]);

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/books' element={<BooksList books={books || []} />} />
            <Route path='/books/:bookId' element={<BookDetails />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
