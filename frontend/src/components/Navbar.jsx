import { Link } from "react-router-dom";
import LoginAndReg from "./LoginAndReg";
import { useAuth } from "../context/AuthProvider";
const Navbar = () => {
  const { logout, token } = useAuth();
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to='/media'>Our Memories</Link>
        <Link to='/registry'>Registry</Link>
        <Link to='/info'>Wedding Info</Link>
        {
          token ? (
            <button onClick={logout}>Logout!</button>
          ) : <Link to='/login'>Login / Register</Link>
        }
      </nav>
    </>
  )
}

export default Navbar;