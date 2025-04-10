import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  // Electronics
  { id: 1, name: 'HP 15, AMD Ryzen 5 7520U', price: 45000, image: '/images/laptop.jpg', description: 'High-performance laptop with 16GB RAM and 512GB SSD.' },
  { id: 2, name: 'Motorola Edge 50 Fusion 5G', price: 25000, image: '/images/phone.jpg', description: 'Latest smartphone with 128GB storage and 48MP camera.' },
  { id: 3, name: 'JBL Tune 510BT', price: 3000, image: '/images/headphones.jpg', description: 'Noise-cancelling headphones with 20-hour battery life.' },
  { id: 4, name: 'Amazfit Active 42mm AMOLED Smart Watch', price: 8000, image: '/images/smartwatch.jpg', description: 'Fitness tracker with heart rate monitor and notifications.' },
  { id: 5, name: 'Samsung Galaxy Tab A9+', price: 18000, image: '/images/tablet.jpg', description: '10-inch tablet with 64GB storage and stylus support.' },
  // Clothing
  { id: 6, name: 'Van Heusen Men Athleisure Ultra Soft Polo T-Shirt - Short Sleeve, Textured', price: 799, image: '/images/t-shirt.jpg', description: 'Comfortable cotton t-shirt in multiple colors.' },
  { id: 7, name: 'U.S. Polo Assn. Denim Co. Mens Regular Jeans', price: 1999, image: '/images/jeans.jpg', description: 'Slim-fit denim jeans with stretch fabric.' },
  // Home & Kitchen
  { id: 8, name: 'Butterfly Jet Elite 750 Watts Mixer Grinder with 4 Jars', price: 3500, image: '/images/grinder.jpg', description: '500W mixer grinder with 3 jars for blending and grinding.' },
  { id: 9, name: 'Havells Electric Kettle Aqua Plus 1250 Watts 1.2 liters', price: 1200, image: '/images/kettel.jpg', description: '1.5L stainless steel kettle with auto shut-off.' },
  // Books
  { id: 10, name: 'The Palace of Illusions Kindle Edition', price: 299, image: '/images/novel.jpg', description: 'Bestselling mystery novel by a renowned author.' },
  { id: 11, name: 'Courage To Be Disliked, The How to free yourself', price: 350, image: '/images/self_help.jpg', description: 'Guide to personal growth and productivity.' },
  // Sports & Fitness
  { id: 12, name: 'Boldfit Yoga Mat for Women and Men', price: 999, image: '/images/yogamat.jpg', description: 'Non-slip yoga mat with 6mm thickness.' },
  { id: 13, name: 'Slovic Dumbbells Set for Home Gym, 5 kg Dumbbell Set of 2', price: 1500, image: '/images/dumbell.jpg', description: 'Pair of 5kg dumbbells for home workouts.' },
];

const ProductList = ({ addToCart }) => {
  return (
    <div style={styles.container}>
      <h2>Products</h2>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <Link to={`/product/${product.id}`} style={styles.link}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.price}>₹{product.price.toLocaleString()}</p>
            </Link>
            <button onClick={() => addToCart(product)} style={styles.button}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  productCard: { background: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' },
  link: { textDecoration: 'none', color: '#333' },
  image: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' },
  name: { fontSize: '18px', margin: '10px 0 5px' },
  price: { fontSize: '16px', color: '#00c4cc', margin: '0' },
  button: { background: '#00c4cc', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%' },
};

export default ProductList;