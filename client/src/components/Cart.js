import React from 'react';

const Cart = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={styles.cartList}>
            {cart.map((item, index) => (
              <li key={index} style={styles.cartItem}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p style={styles.total}>Total: ₹{total}</p>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  header: { textAlign: 'center', color: '#333', marginBottom: '20px' },
  cartList: { listStyle: 'none', padding: 0 },
  cartItem: { padding: '10px', borderBottom: '1px solid #ddd' },
  total: { fontSize: '18px', fontWeight: 'bold', textAlign: 'right', marginTop: '20px' },
};

export default Cart;