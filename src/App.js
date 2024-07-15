import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import DownloadPage from './DownloadPage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/download" element={<DownloadPage />} /> 
                {/* <Route path='/CourseDataFetcher' element={<CourseDataFetcher/>}/> */} 
                {/* <Route path="/results" element={<ResultsPage />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
