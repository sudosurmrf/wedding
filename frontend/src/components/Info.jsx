import { useAuth } from "../context/AuthProvider";
import './Info.css'

const Info = () => {
  const {weddingInfo} = useAuth();

   return (
    <div className="info-container">
      <div className="info-hero">
        <div className="info-hero-overlay">
          <h1 className="info-hero-title">
            {weddingInfo.wife} &amp; {weddingInfo.groom}
          </h1>
          <p className="info-hero-subtitle">{weddingInfo.date}</p>
        </div>
      </div>

      <section className="info-section">
        <h2 className="section-heading">Our Story</h2>
        <p className="info-text">{weddingInfo.ourStory}</p>
      </section>

      <section className="info-section">
        <h2 className="section-heading">Ceremony</h2>
        <p className="info-text">{weddingInfo.ceremony}</p>
      </section>

      <section className="info-section">
        <h2 className="section-heading">Reception</h2>
        <p className="info-text">{weddingInfo.reception}</p>
      </section>

      <section className="info-section">
        <h2 className="section-heading">Dress Code</h2>
        <p className="info-text">{weddingInfo.dressCode}</p>
      </section>

      <section className="info-section">
        <h2 className="section-heading">location</h2>
        <p className="info-text">{weddingInfo.location}</p>
      </section>
      <section className="info-section">
        <h2 className="section-heading">Directions</h2>
        <p className="info-text">{weddingInfo.directions}</p>
      </section>
    </div>
  
  );
}

export default Info;