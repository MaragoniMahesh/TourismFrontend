import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setShowAlert(false);
  
    try {
      const response = await axios.get(`http://localhost:8080/api/users/post/search`, {
        params: { query: searchQuery.toLowerCase() },
      });
  
      const { data } = response;
  
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
        setRecommendation('Can I recommend some options for you?');
      } else if (typeof data === 'object' && data.message) {
        setResults([]);
        setRecommendation(data.message);
      }
      setShowAlert(true);
    } catch (error) {
      console.error('Error searching posts:', error);
      setResults([]);
      setRecommendation('An error occurred while searching for recommendations. Please try again later.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRecommendation = () => {
    setRecommendation('Here are some recommended places: ' + results.map(post => `${post.location}: ${post.description}`).join(', '));
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="recommendations-page-container">
      <Button variant="secondary" className="mb-4" onClick={handleBack}>
        Back to Dashboard
      </Button>
      <h2>Recommendations</h2>
      <Form>
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search for locations or categories (e.g., beaches, temples)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
        </Button>
      </Form>

      {showAlert && (
        <Alert variant={recommendation.includes('Sorry') || recommendation.includes('error') ? 'danger' : 'info'} className="mt-3">
          <p>{recommendation}</p>
          {recommendation.includes('Can I recommend') && (
            <Button variant="success" onClick={handleConfirmRecommendation}>
              Yes, please recommend
            </Button>
          )}
        </Alert>
      )}

      {results.length > 0 && !recommendation.includes('Sorry') && (
        <ul className="mt-3">
          {results.map((post, index) => (
            <li key={index} className="post-card">
              <h5>{post.location}</h5>
              <p>{post.description}</p>
              {post.image && (
                <img
                  src={`data:${post.imageType};base64,${post.image}`}
                  alt={post.location}
                  className="post-image"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
