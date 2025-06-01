import { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = 'http://localhost:3000/api'
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [name, setName] = useState(localStorage.getItem('name') || '');

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
    <AuthContext.Provider value={{ name, token, logout, login, register }}>
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