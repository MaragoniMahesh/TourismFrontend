import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostPage.css';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddPost = () => {
    navigate('/addpost');
  };

  return (
    <Container className="posts-page-container">
      <div className="buttons-container">
        <Button variant="secondary" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
        <Button variant="primary" onClick={handleAddPost}>
          Add Post
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="post-card">
                <Card.Header>
                  <strong>{post.username}</strong> - {post.location}
                </Card.Header>
                <Card.Body>
                  {post.mediaType === 'video' ? (
                    <video className="video" controls>
                      <source src={`data:video/mp4;base64,${post.image}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Card.Img className="card-img-top" src={`data:image/jpeg;base64,${post.image}`} alt="Post" />
                  )}
                  <Card.Text className="mt-3">{post.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary">Like</Button>
                    <Button variant="secondary">Comment</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No posts available. Be the first to add a post!</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PostPage;
