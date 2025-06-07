import './PriceTracker.css';
import {useState, useEffect} from 'react';
import { useAuth } from '../context/AuthProvider';


const PriceTracker = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [threshold, setThreshold] = useState(0);
  const {BASE_URL} = useAuth();

  const getPrice = async() => {
    const response = await fetch(`${BASE_URL}/edc-price`);
    const { price } = await response.json();
    setPrice(price);
    setLoading(false);
    console.log(price);
  }

  useEffect(() => {
    getPrice();
    //cron for every 3 hour update
    const interval = setInterval(getPrice, 3 * 60 * 60 * 1000);
    return () => clearInterval(interval)
  },[]);

  const subscribe = async(e) => {
    e.preventDefault();

    try{
      await fetch(`${BASE_URL}/edc-price/alert`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, threshold: Number(threshold) })
      });

      alert(`You're subscribed! You will receive an email when the price drops below ${threshold}`);
      showForm(false);
      setEmail('');
      setThreshold(0)
    }catch(err){
      console.log(err);
      alert('Something went wrong');
    }
  }
if(loading) return null;

  return (
    <>
    <div className="ticker" onClick={() => setShowForm(true)}>
        <div className="ticker__move">
          🎟️ EDC Vegas 3-Day Tickets: ${price.toFixed(2)} 🎟️
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Get Notified on Price Drop</h2>
            <form onSubmit={subscribe}>
              <label>
                Your Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label>
                Alert me below $
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={threshold}
                  onChange={e => setThreshold(e.target.value)}
                />
              </label>
              <button type="submit">Subscribe</button>
            </form>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default PriceTracker;