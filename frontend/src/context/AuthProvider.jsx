import { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = 'https://defund-the-hoa.com/api'
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [weddingInfo, setWeddingInfo] = useState({
    groom: 'Ari', wife: 'Courtnee', date: 'May 15th, 2026', ourStory: 'write something here about us', ceremony: 'EDC 2026 Chapel Of Nature between 8:00 PM - 9:00 PM', 
    reception: 'EDC 2026 for the weekend, come party with us!', dressCode: 'Festival Attire', location: 'EDC Las Vegas -  7000 Las Vegas Blvd N, Las Vegas, NV 89115', directions: 'Do NOT use Google or Waze. Your driving and parking experience will be the fastest and easiest if you follow our directions and signs, and follow us on all social media. Please follow all signs and traffic officer directions. I-15 is the best, fastest route to the festival. Use I-15 northbound. From the Strip, get onto I-15 North via either Tropicana Ave, Flamingo Rd, Spring Mountain Rd, or Sahara Ave. Stay on I-15 all the way to the Speedway at Exit 54. Look out for electronic message signs on the freeway with the latest information and traffic updates. Use both right-hand lanes approaching the Speedway on I-15; pick the lane with the least traffic all the way to Exit 54 (Speedway Blvd).'
  });


useEffect(()=> {
  const getInfo = async() => {
    const response = await fetch(`${BASE_URL}/info`);
    const result = await response.json();
    console.log(result);
    if(result.length >= 2){
      return console.error('to many wedding objects currently!')
    }
    setWeddingInfo(result[0])
  }
  getInfo();
},[])

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
    }
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      setName(localStorage.getItem('name'))
    }
  }, [token])

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      const result = await response.json();
      console.log('registered!', result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      setToken(result.token);
      setName(result.name);
      navigate('/');
    } catch (err) {
      console.log('error occurred!', err);
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      console.log(result);
      console.log('logged in!', result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      setToken(result.token);
      setName(result.name);
      navigate('/');
    } catch (err) {
      console.log('error!', err);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken(null);
    setName('');
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ weddingInfo, name, token, logout, login, register, BASE_URL }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be inside the AuthProvider');
  }
  return ctx;
}