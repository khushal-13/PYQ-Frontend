import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/BookDetailsPage.css';

const BookDetailsPage = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL parameter
  const location = useLocation();
  const { book } = location.state || {}; // Retrieve the book from state

  const downloadBook = async () => {
    try {
      const response = await fetch(`https://khushal.online/book/download/${book.link}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response, for example:
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${book.link}`; // Set the filename
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!book) {
    return <p>Book not found</p>;
  }

  // Create a Base64 image data URL
  const imageUrl = `data:${book.imageType};base64,${book.imageData}`;

  return (
    <div className="book-details-page">
      <h2>Book Details</h2>
      <img src={imageUrl} alt={book.title} className="book-image" />
      <div className="book-details">
        <h1>{book.title}</h1>
        <p><strong>Author: </strong> {book.author}</p>
        <p><strong>Tittle: </strong> {book.tittle}</p>
        <div className="book-actions">
          <button className="download-button" onClick={downloadBook}>
            Download E-book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
