import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { connectWebSocket, sendWebSocketMessage, subscribeToWebSocket } from '../api/websocket';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    connectWebSocket();

    const handleWebSocketMessage = (data) => {
      if (data.type === 'roleCheck' && data.role === 'admin') {
        setUser((prevUser) => ({ ...prevUser, role: 'admin' }));
      }
    };

    subscribeToWebSocket(handleWebSocketMessage);
  }, [setUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, role } = response.data;
      setUser({ token, role });
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      sendWebSocketMessage({ type: 'checkRole', token });  
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
