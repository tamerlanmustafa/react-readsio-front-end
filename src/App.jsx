import { useContext, useState, useEffect } from 'react';
import { Routes, Route,  useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import BooksList from './components/BooksList/BooksList';
import BookDetails from './components/BookDetails/BookDetails';
import { UserContext } from './contexts/UserContext';
import BookForm from './components/BookForm/BookForm';

import * as bookService from './services/bookService';




const App = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);

  const handleAddBook = async (bookData) => {
    const newBook = await bookService.create(bookData);
    if (newBook && newBook.book) {
      setBooks([newBook.book, ...books]); 
      navigate('/books');
    }
    
  }

  const handleDeleteBook = async (bookId) => {
    const deletedBook = await bookService.deleteBook(bookId);
    setBooks(books.filter((book) => book.id !== deletedBook.id));
    navigate('/books');
  }


  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const booksData = await bookService.index();
        setBooks(booksData.books || []); 
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
            <Route path='/books/new' element={<BookForm handleAddBook={handleAddBook } />} />
            <Route path='/books/:bookId' element={<BookDetails handleDeleteBook={handleDeleteBook } />} />
            <Route path='/books/:bookId/edit' element={<BookForm />}
            />
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
