import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import './DownloadPage.js'

const HomePage = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [subject, setSubject] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleReset = () => {
        setSelectedOption('');
        setSubject('');
        setBranch('');
        setSemester('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedOption && subject && branch && semester) {
            try {
                console.log(branch, " ", semester, " ", subject)
                const response = await fetch(`http://localhost:8080/paper/getPaper?branch=${branch}&semester=${semester}&subject=${subject}`);
                if (!response.ok) {  
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data)
                navigate('/download', { state: { papers: data } });
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching data');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    What do you want to search?
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Select an option</option>
                        <option value="download-question-paper">Download Question Paper</option>
                        <option value="download-reference-books">Download Reference Books</option>
                    </select>
                </label>

                <>
                    <label>
                        Select Branch:
                        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="">Select a branch</option>
                            <option value="IT">IT</option>
                            <option value="CS">CS</option>
                            <option value="EXTC">EXTC</option>
                            <option value="CSE">CSE</option>
                        </select>
                    </label>
                    <label>
                        Select Semester:
                        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                            <option value="">Select a semester</option>
                            {[...Array(8).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                        </label>

                        <label>
                        Select Subject:
                        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="">Select a subject</option>
                            <option value="Computer Network"> Computer Network</option>
                            <option value="Engineering Mathematics"> Engineering Mathematics </option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value=" Green IT">Green IT</option>
                            <option value="Operating System"> Operating System</option>
                            <option value="Data Structures"> Data Structures</option>
                            
                        </select> 
                    </label>
                </>

                <div className="button-group">
                    <button type="button" onClick={handleReset}>Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default HomePage;
