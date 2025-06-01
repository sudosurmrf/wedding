import  {createContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const BASE_URL = 'http://localhost:3000/api'


  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if(ctx === undefined){
    throw new Error('useAuth must be inside the AuthProvider');
  }
  return ctx;
}