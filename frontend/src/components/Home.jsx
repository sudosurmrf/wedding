import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import PriceTracker from './PriceTracker';
import './Home.css';

const Home =() => {
  const navigate = useNavigate();
  const {weddingInfo} = useAuth();
  return (
    <>
    <PriceTracker />
    <div className="home-container">
      <div className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">{weddingInfo.wife} and {weddingInfo.groom} </h1>
          <p className="hero-subtitle">{weddingInfo.date}</p>
          <button onClick={()=>navigate('/rsvp')}className="hero-button">RSVP</button>
        </div>
      </div>

      <section className="story-section">
        <h2 className="section-heading">Our Story</h2>
        <p className="story-text">
         {weddingInfo.ourStory}
        </p>
      </section>

      <section className="details-section">
        <h2 className="section-heading">Event Details</h2>
        <ul className="details-list">
          <li>
            <span className="detail-label">Ceremony:</span> {weddingInfo.ceremony}
          </li>
          <li>
            <span className="detail-label">Reception:</span> {weddingInfo.reception}
          </li>
          <li>
            <span className="detail-label">Dress Code:</span> {weddingInfo.dressCode}
          </li>
          <li>
            <span className="detail-label">Location:</span> {weddingInfo.location}
          </li>
        </ul>
      </section>

      {/* Footer / Thanks Section */}
      <footer className="footer">
        <p className="footer-text">
          Thank you for being part of our special day. We can’t wait to celebrate with you!
        </p>
      </footer>
    </div>
    </>
  );
}

export default Home;
