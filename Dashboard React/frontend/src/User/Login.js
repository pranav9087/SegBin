import React, { useState } from 'react';
import Navbar from './NavBar';
import { useLogIn } from '../hooks/useLogIn';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {logIn, loading, error} = useLogIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await logIn(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
    <Navbar />
    <div className="login-page">
      <div className="login-container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button disabled={loading} type="submit">Log in</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;

