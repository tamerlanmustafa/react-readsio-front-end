import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as bookService from '../../services/bookService';

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    console.log("bookId:", bookId);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await bookService.show(bookId);
                console.log("bookData:", bookData);
                setBook(bookData);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBook();
    }, [bookId]);
    console.log('book stata:', book);
    


    if (!book) return <p>Loading book...</p>;

   return (
    <main>
      <section>
        <header>
          <p>{book.genre}</p>
          <h1>{book.title}</h1>
          <p>
            {book.author}
          </p>
        </header>
        <p>{book.description}</p>
      </section>
      <section>
        <h2>Comments</h2>
      </section>
    </main>
  );
}


export default BookDetails;