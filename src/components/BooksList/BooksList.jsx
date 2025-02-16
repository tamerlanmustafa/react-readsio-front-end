import { Link } from 'react-router';

const BookList = (props) => {
  if (!props.books) return <p>Loading books...</p>;

  return (
    <main>
    {props.books.map((book) => (
      <Link key={book.id} to={`/books/${book.id}`}>
        <article>
          <header>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
          </header>
          <p>{book.description}</p>
        </article>
      </Link>
    ))}
  </main>
  );
  
};
  
  export default BookList;
  