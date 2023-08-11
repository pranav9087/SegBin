import React, { useState } from 'react';
import Navbar from './NavBar';
import { useSignUp } from '../hooks/useSignUp';
const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {signUp, loading, error} = useSignUp();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUp(email, password, username);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <>
    <Navbar />
    <div className="login-page">
      <div className="login-container">
        <h1>Sign Up</h1>
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
              type="username"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
          <button disabled = {loading} type="submit">Sign Up</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUpPage;