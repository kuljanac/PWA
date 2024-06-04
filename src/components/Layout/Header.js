import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAdmin(false);
  };

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        {user ? (
          <>
            {isAdmin && <Link to="/admin">Admin Panel</Link>}
            <button className="logout-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
