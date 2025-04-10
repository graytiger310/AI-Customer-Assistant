import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, isLoggedIn, isAdmin, onLogout }) => {
  return (
    <header className="header">
      <h1 className="header-title">Vinay Store</h1>
      <nav>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <Link to="/admin" style={styles.link}>Admin Panel</Link>
            ) : (
              <>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/cart" style={styles.link}>Cart ({cartCount})</Link>
              </>
            )}
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  link: { color: '#fff', margin: '0 15px', textDecoration: 'none', fontWeight: '500' },
  logoutButton: { background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: '500' },
};

export default Header;