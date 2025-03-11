import { Link } from 'react-router';
import { useState, useMemo } from 'react';
import './BooksList.css';

const BookList = ({ books = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;
  
  const totalPages = Math.ceil(books.length / booksPerPage);
  
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const selectedBooks = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * booksPerPage;
    return books.slice(startIndex, startIndex + booksPerPage);
  }, [books, safeCurrentPage, booksPerPage]);

  return (
    <main>
      <div className="books">
        {selectedBooks.length > 0 ? (
          selectedBooks.map((book) => (
            <Link className='each-book' key={book.id} to={`/books/${book.id}`}>
                  <h3>{book.title}</h3>
                  <h4>{book.author}</h4>
            </Link>
          ))
        ) : (
          <p>No books available.</p>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
            >
              ◀
            </button>

            <span> {safeCurrentPage} / {totalPages} </span>

            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={safeCurrentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </div>

    </main>
  );
};

export default BookList;

  