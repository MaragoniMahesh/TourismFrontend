import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import tajMahalImage from '../Assets/TajMahal.jpg';
import beachImage from '../Assets/Beach.jpeg';
import warangalImage from '../Assets/WarangalFort.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-container">
      <Button variant="secondary" onClick={handleBackToDashboard} className="mb-4">
        Back to Dashboard
      </Button>

      <section className="carousel-section">
        <h2>Famous Places to Visit</h2>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={tajMahalImage}
              alt="Taj Mahal"
            />
            <Carousel.Caption>
              <h3>Taj Mahal</h3>
              <p>The majestic Taj Mahal, an iconic symbol of love.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={beachImage}
              alt="Beach"
            />
            <Carousel.Caption>
              <h3>Beach</h3>
              <p>Relax on the beautiful and serene beaches.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={warangalImage}
              alt="Warangal Fort"
            />
            <Carousel.Caption>
              <h3>Warangal Fort</h3>
              <p>Explore the rich history and architecture of Warangal.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="videos-section mt-5">
        <h2>Videos of Visiting Places</h2>
        <div className="video-container">
          <video width="100%" height="auto" controls>
            <source src="path/to/your/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-container mt-4">
          <video width="100%" height="auto" controls>
            <source src="path/to/your/video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default Home;
