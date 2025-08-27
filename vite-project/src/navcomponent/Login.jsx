import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/login', {
        email,
        password
      });

      const token = res.data.token;

      // ✅ Save token
      localStorage.setItem('token', token);

      // ✅ Decode and save isAdmin
      const decoded = jwtDecode(token);
      localStorage.setItem('isAdmin', decoded.isAdmin);

      
      navigate('/');

    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='whole' style={{height: "100vh", width: "100vw",}}>
      <div style={{backgroundColor: "black"}}>
        <Navbar />
      </div>

    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    <p>
  <Link to= "/forgot-password">forgot password </Link>
</p>
    </div>
  );
};

export default Login;