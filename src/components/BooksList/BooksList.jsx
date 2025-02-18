import { Link } from 'react-router';
import { useState, useMemo } from 'react';
import './BooksList.css';

const BookList = ({ books = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  
  const totalPages = Math.ceil(books.length / booksPerPage);
  
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const selectedBooks = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * booksPerPage;
    return books.slice(startIndex, startIndex + booksPerPage);
  }, [books, safeCurrentPage, booksPerPage]);

  return (
    <main>
      {selectedBooks.length > 0 ? (
        selectedBooks.map((book) => (
          <Link key={book.id} to={`/books/${book.id}`}>
            <article className='each-book'>
              <header>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
              </header>
              <p>{book.description}</p>
            </article>
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
            ◀ Prev
          </button>
          <span> Page {safeCurrentPage} of {totalPages} </span>
          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={safeCurrentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </main>
  );
};

export default BookList;

  