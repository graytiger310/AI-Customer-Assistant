import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div style={styles.container} className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="default 'Username'"
          />
        </div>
        <div style={styles.field}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="default 'Password'"
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.note}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px', background: '#fff' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  field: { textAlign: 'left' },
  input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' },
  button: { padding: '10px', background: '#3498db', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' },
  note: { marginTop: '10px', color: '#666' },
};

export default Login;