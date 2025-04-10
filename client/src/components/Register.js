import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    onRegister({ username, password });
    alert('Registration successful! Please log in.');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2>Register for Mock Store</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Choose a username"
          />
        </div>
        <div style={styles.field}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Create a password"
          />
        </div>
        <div style={styles.field}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p style={styles.note}>
        Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  field: { textAlign: 'left' },
  input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' },
  button: { padding: '10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' },
  note: { marginTop: '10px', color: '#666' },
  link: { color: '#007bff', textDecoration: 'none' }
};

export default Register;