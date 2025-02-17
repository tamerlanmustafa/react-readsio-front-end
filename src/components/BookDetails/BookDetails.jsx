import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as bookService from '../../services/bookService';

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await bookService.show(bookId);
                setBook(bookData.book);
                console.log(bookData.book);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBook();
    }, [bookId]);
    


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
               <h2>Reviews</h2>
               {!book.reviews.length && <p>There are no reviews</p>}
                {book.reviews.map((review) => (
                     <article key={review.review_id}>
                          <header>
                            <h3>Rating : {review.rating}</h3>
                            <p>{`${review.reviewer_username} posted on
                ${new Date(review.review_created_at).toLocaleDateString()}` }</p>
                          </header>
                          <p>{review.review_text}</p>
                     </article>
                ))}
      </section>
    </main>
  );
}


export default BookDetails;