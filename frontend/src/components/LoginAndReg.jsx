import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

const LoginAndReg = () => {
  const { token, login, logout, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [existingUser, setExistingUser] = useState(true);

  const handleLogin = async () => {
    await login(email, password);
    setEmail('');
    setPassword('');
  }

  const handleRegister = async () => {
    await register(firstName, lastName, email, password);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      {token ? (<><button onClick={logout}>Logout!</button>
      </>)
        :
        existingUser ?
          (<>
            <div>
              <input type='text' placeholder="Enter Email Here" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type='text' placeholder="Enter Password Here" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button onClick={() => handleLogin()}>Log in!</button>
              <button onClick={() => setExistingUser(false)}>Need an account? Signup Here!</button>
            </div>
          </>)
          :
          (<>
            <div>
              <input type='text' placeholder="Enter First Name Here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type='text' placeholder="Enter Last Name Here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type='text' placeholder="Enter Email Here" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type='text' placeholder="Enter Password Here" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button onClick={() => handleRegister()}>Register</button>
              <button onClick={() => setExistingUser(true)}>Already Have An Account? Login Here</button>
            </div>
          </>)
      }

    </>
  )
}

export default LoginAndReg;