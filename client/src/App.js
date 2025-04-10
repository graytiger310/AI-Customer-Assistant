import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails'; // New import
import Cart from './components/Cart';
import ChatWindow from './components/ChatWindow';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

function App() {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert('Please log in to add items to cart.');
      navigate('/login');
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  const handleLogin = (credentials) => {
    const { username, password } = credentials;
    const storedPassword = users[username];

    if (username === 'Username' && password === 'Password') {
      setUsername('Username');
      setIsLoggedIn(true);
      navigate('/');
      return;
    }

    if (storedPassword && storedPassword === password) {
      setUsername(username);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert('Invalid credentials. Use "Username" and "Password" or register.');
    }
  };

  const handleRegister = (credentials) => {
    if (users[credentials.username]) {
      alert('Username already exists. Try a different one.');
      return;
    }
    if (credentials.username === 'Username') {
      alert('The username "Username" is reserved for default login. Choose another.');
      return;
    }
    setUsers((prev) => ({ ...prev, [credentials.username]: credentials.password }));
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setCart([]);
    navigate('/login');
  };

  return (
    <div className="App">
      <Header cartCount={cart.length} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ProductList addToCart={addToCart} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/product/:id"
            element={
              isLoggedIn ? (
                <ProductDetails addToCart={addToCart} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/cart"
            element={
              isLoggedIn ? (
                <Cart cart={cart} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </main>
      <ChatWindow username={username} />
      <Footer />
    </div>
  );
}

export default App;