// src/components/PapersPage
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/PapersPage.css';

const DownloadPage = () => {
    const location = useLocation();
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        if (location.state && location.state.papers) {
            setPapers(location.state.papers);
        }
    }, [location.state]);

    const handleDownload = async (paper) => {
        try {
            // Construct the download URL based on the paper details
            const downloadUrl = `https://khushal.online/paper/download/${encodeURIComponent(paper.link)}`;
            console.log(downloadUrl)

            // Use axios to make a GET request to download the paper
            const response = await axios.get(downloadUrl, {
                responseType: 'blob' // Ensure response is treated as binary data (e.g., for files)
            });
    
            // Create a URL for the blob data and initiate download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', paper.link); // Set the filename for download
            document.body.appendChild(link);
            link.click(); // Simulate click on the download link
            link.remove(); // Clean up after download
    
            console.log(`Downloaded paper: ${paper.link}`);
        } catch (error) {
            console.error('Error downloading paper:', error);
            alert('Error downloading paper');
        }
    };

    return (
        <div className="download-page">
            <h1>Download Question Papers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {papers.map((paper, index) => (
                        <tr key={index}>
                            <td>{paper.subject}</td>
                            <td>{paper.year}</td>
                            <td>{paper.month}</td>
                            <td>
                                <button
                                    className="download-button"
                                    onClick={() => handleDownload(paper)}
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DownloadPage;
