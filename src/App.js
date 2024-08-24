// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BooksPage from './components/BooksPage';
import BookDetailsPage from './components/BookDetailsPage';
import PapersPage from './components/PapersPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/books/:id" element={<BookDetailsPage />} />
                    <Route path="/download" element={<PapersPage />} />
                </Routes>
            {/* <div className="app">
                
            </div> */}
        </Router>
    );
};

export default App;
