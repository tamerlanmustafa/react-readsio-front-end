import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as bookService from '../../services/bookService';
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';
import './BookDetails.css';

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
     <main className='book-details'>
       
      <section className='book-info'>
         <h1>{book.title}</h1>
         <h4>{book.author}</h4>
         <div>
          <p><strong>Description:</strong>  {book.description}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
         </div>
      </section>
       
       
      <section className='reviews'>
        <ReviewForm handleAddReview={handleAddReview} />
        
        {!book.reviews.length && <p>There are no reviews</p>}
        {book.reviews.map((review) => (
          <article className='reviews-section' key={review.review_id || review.id
          }>
                <h2>Reviews</h2>
                  <header className='review-header'>
                  <h3 className='rating-stars'>
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </h3>

                    <h4>{review.review_text}</h4>
                    <p>
                      <i>{review.reviewer_username}</i> posted on{" "}
                      {new Date(review.review_created_at).toLocaleDateString()}
                    </p>


              {/* <Link to={`/books/${bookId}/reviews/${review.id || review.review_id}/edit`} onClick={() => handleUpdateReview(review.review_id || review.id)}>Update comment</Link> */}


              {book.added_by_username  === user.username && (
                <Link onClick={() =>handleDeleteReview(review.review_id || review.id)}>Delete comment</Link>

              )}

                    {/* {book.book_added_by_id === user.id && (
                      <>
                        <Link to={`/books/${bookId}/edit`}>Edit</Link>
                        <button onClick={()=> props.handleDeleteBook(bookId)}>
                          Delete
                        </button>                           
                      </>
                              
                    )} */}
                  </header>
              </article>
        ))}
      </section>
    </main>
  );
}


export default BookDetails;