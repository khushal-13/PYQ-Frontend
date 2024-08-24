import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import '../styles/BooksPage.css';

const BooksPage = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL parameter
  const location = useLocation();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (location.state && location.state.books) {
      setBooks(location.state.books);
    }
  }, [location.state]);

  return (
    <div className="books-page">
      <h1>Books</h1>
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => {
            // Create a Base64 image data URL
            const imageUrl = `data:${book.imageType};base64,${book.imageData}`;
            return (
              <div className="book" key={book.id}>
                <img src={imageUrl} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <Link to={`/books/${book.id}`} state={{ book }}>
                  <button>View</button>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No books found.</p>
        )}
      </div>
      {/* Display book details if ID is present in the URL */}
      {id && (
        <div className="book-details-page">
          <h2>Book Details</h2>
          {books.find((book) => book.id === parseInt(id)) ? (
            books.filter((book) => book.id === parseInt(id)).map((book) => (
              <div key={book.id}>
                <img src={`data:${book.imageType};base64,${book.imageData}`} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.description}</p>
              </div>
            ))
          ) : (
            <p>Book not found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
