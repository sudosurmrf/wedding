import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import './Navbar.css';

const Navbar = () => {
  const { logout, token, name } = useAuth();
   return (
    <nav className="navbar">
       {name ? <h1 id='name'>Hello {name}</h1> : <></>
    }
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/media" className="nav-link">
        Our Memories
      </Link>
      <Link to="/registry" className="nav-link">
        Registry
      </Link>
      <Link to="/info" className="nav-link">
        Wedding Info
      </Link>
      <Link to='/rsvp' className="nav-link">
        RSVP
      </Link>

      {token ? (
        <button onClick={logout} className="nav-button">
          Logout
        </button>
      ) : (
        <Link to="/login" className="nav-link">
          Login / Register
        </Link>
      )}
    </nav>
  );
};

export default Navbar;