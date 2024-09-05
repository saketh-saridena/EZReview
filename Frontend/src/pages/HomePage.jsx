import React from 'react'
import './HomePage.css'
import { useState,useRef } from 'react'
import axios from 'axios'
import { Circles } from 'react-loader-spinner'
const HomePage = () => {
    const [isActive, setIsActive] = useState(true)
    const inputRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError] = useState('');
    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
      };
    const searchToggle = (event) => 
    {
        if (!isActive) 
        {
          setIsActive(true);
          event.preventDefault();
          setTimeout(() => {
            inputRef.current.focus(); // Focus the input field when it becomes active
        }, 10);
        } 
        else if ( event.target.classList.contains('close'))
        {
          setSearchQuery('')
          setSearchResults(null)
        }
        else if(searchQuery.trim() !== ''){
            handleSearch();
        }
    }
    const handleChange = (event) =>{
        setSearchQuery(event.target.value);
    }
    const handleSearch = async () =>{
        setLoading(true)
        setError(false)
        try {
            const response = await axios.post('http://localhost:5000/search',{ user_url: searchQuery});
            console.log(response.data) // Assuming your backend returns search results in the 'results' field
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch data. Please try again later.');
        }
        finally{
            setLoading(false)
        }
    }
  
  return (
    <>

<div className="">
        <div className="blur-circle1">
        </div>
        <div className="blur-circle2">
        </div>
    
        <div className='content'>
            <div className="info">
                    <h1>Refining Reviews, Revealing Insights</h1>
                    <h3>Insightful Summary of Product Reviews</h3>
            </div>
            <div className='search_container'>
                    <div className={`search-wrapper ${ isActive ? 'active' : ''}`}>
                        <div className="input-holder">
                            <input
                            type="text"
                            className="search-input"
                            placeholder="Enter Any Amazon Product URL"
                            ref={inputRef}
                            onChange={handleChange}
                            onKeyDownCapture={handleKeyPress}
                            style={{display: isActive? 'block':'none'}}
                            value={searchQuery}/>
                            <button className="search-icon" onClick={searchToggle}>
                            <span></span>
                            </button>
                        </div>
                        <span className="close" onClick={searchToggle}></span>
                    </div>
            </div> 
            <div className="search-results">
                {loading && 
                    <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass="loader"
                    visible={true}/>
                }
                {error && <div className="search-error">{error}</div>}
                {searchResults && (
                    <div className="results-container">
                        <div className="result-item">
                            {/* <h3>{searchResults.user_url}</h3> */}
                            <div className="reviews-grid">
                                <div className="review-detail positive">
                                    <span className="review-value">{searchResults.positive_reviews_percentage}%</span>
                                    <span className="review-label">Positive</span>
                                </div>
                                <div className="review-detail negative">
                                    <span className="review-value">{searchResults.negative_reviews_percentage}%</span>
                                    <span className="review-label">Negative</span>
                                </div>
                                <div className="review-detail neutral">
                                    <span className="review-value">{searchResults.neutral_reviews_percentage}%</span>
                                    <span className="review-label">Neutral</span>
                                </div>
                            </div>
                            <div className="summary">
                                <p>Summary:</p>
                                <p>{searchResults.summary}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            
        </div>
        
        
    </div>   
          

    </>
  )
}

export default HomePage