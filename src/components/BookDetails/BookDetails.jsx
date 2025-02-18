import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as bookService from '../../services/bookService';
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';


const BookDetails = (props) => {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await bookService.show(bookId);
                setBook(bookData.book);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBook();
    }, [bookId]);
    
  const handleAddReview = async (reviewFormData) => {
      const newReview = await bookService.createReview(bookId, reviewFormData);
      console.log(newReview);
      setBook({ ...book, reviews: [newReview.review, ...book.reviews] });
  };

  const handleUpdateReview = (reviewId) => async (reviewFormData) => {
    const updatedReview = await bookService.updateReview(bookId, reviewId, reviewFormData);
    setBook({ ...book, reviews: book.reviews.map((review) => (review.id === updatedReview.review.id ? updatedReview.review : review)) });
  };
  
  const handleDeleteReview= async (reviewId) => {
    const deletedReview = await bookService.deleteReview(bookId, reviewId);
    setBook({ ...book, reviews: book.reviews.filter((review) => review.id !== deletedReview.id) });
  };
  
    if (!book) return <p> Loading book... </p>;
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
               <ReviewForm handleAddReview={handleAddReview} />
               
               {!book.reviews.length && <p>There are no reviews</p>}
               {book.reviews.map((review) => (
                     <article key={review.review_id || review.id
                     }>
                          <header>
                            <h3>Rating : {review.rating}</h3>
                            <p>{`${review.reviewer_username} posted on
                            ${new Date(review.review_created_at).toLocaleDateString()}`}</p>
                     <p>{review.review_text}</p>

                     {/* <Link to={`/books/${bookId}/reviews/${review.id || review.review_id}/edit`} onClick={() => handleUpdateReview(review.review_id || review.id)}>Update comment</Link> */}
                     <Link onClick={() =>handleDeleteReview(review.review_id || review.id)}>Delete comment</Link>
                     


                            {book.book_added_by_id === user.id && (
                              <>
                                <Link to={`/books/${bookId}/edit`}>Edit</Link>
                                <button onClick={()=> props.handleDeleteBook(bookId)}>
                                  Delete
                                </button>                           
                              </>
                                      
                            )}
                              
                          </header>
                     </article>
                ))}
      </section>
    </main>
  );
}


export default BookDetails;