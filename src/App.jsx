import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import BooksList from './components/BooksList/BooksList';

import { UserContext } from './contexts/UserContext';

import * as bookService from './services/bookService';




const App = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllBooks = async () => {
      const booksData = await bookService.index();
    
      // console log to verify
      console.log('booksData:', booksData);
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
            <Route path='/books' element={<BooksList />} />
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
