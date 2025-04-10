import React from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
  // Electronics
  { id: 1, name: 'Laptop', price: 45000, image: '/images/laptop.jpg', description: 'High-performance laptop with 16GB RAM and 512GB SSD.', specs: 'Intel i7, 16GB RAM, 512GB SSD, 15.6" Display' },
  { id: 2, name: 'Amazfit Active 42mm AMOLED Smart Watch', price: 25000, image: '/images/phone.jpg', description: 'Latest smartphone with 128GB storage and 48MP camera.', specs: 'Snapdragon 732G, 128GB Storage, 48MP Camera, 6.5" AMOLED' },
  { id: 3, name: 'Headphones', price: 3000, image: '/images/headphones.jpg', description: 'Noise-cancelling headphones with 20-hour battery life.', specs: 'Bluetooth 5.0, 40mm Drivers, 20h Battery' },
  { id: 4, name: 'Smartwatch', price: 8000, image: '/images/smartwatch.jpg', description: 'Fitness tracker with heart rate monitor and notifications.', specs: '1.3" Display, Heart Rate Sensor, IP68 Waterproof' },
  { id: 5, name: 'Tablet', price: 18000, image: '/images/tablet.jpg', description: '10-inch tablet with 64GB storage and stylus support.', specs: 'Octa-Core, 64GB Storage, 10.1" IPS, Stylus Included' },
  // Clothing
  { id: 6, name: 'T-Shirt', price: 799, image: '/images/t-shirt.jpg', description: 'Comfortable cotton t-shirt in multiple colors.', specs: '100% Cotton, Available in S/M/L/XL, Machine Washable' },
  { id: 7, name: 'Jeans', price: 1999, image: '/images/jeans.jpg', description: 'Slim-fit denim jeans with stretch fabric.', specs: '98% Cotton, 2% Spandex, Slim Fit, Sizes 28-38' },
  // Home & Kitchen
  { id: 8, name: 'Mixer Grinder', price: 3500, image: '/images/grinder.jpg', description: '500W mixer grinder with 3 jars for blending and grinding.', specs: '500W Motor, 3 Stainless Steel Jars, 2-Year Warranty' },
  { id: 9, name: 'Electric Kettle', price: 1200, image: '/images/kettel.jpg', description: '1.5L stainless steel kettle with auto shut-off.', specs: '1500W, 1.5L Capacity, Auto Shut-Off, Cordless' },
  // Books
  { id: 10, name: 'Fiction Novel', price: 299, image: '/images/novel.jpg', description: 'Bestselling mystery novel by a renowned author.', specs: 'Paperback, 320 Pages, Published 2023' },
  { id: 11, name: 'Self-Help Book', price: 350, image: '/images/self_help.jpg', description: 'Guide to personal growth and productivity.', specs: 'Hardcover, 250 Pages, Published 2022' },
  // Sports & Fitness
  { id: 12, name: 'Yoga Mat', price: 999, image: '/images/yogamat.jpg', description: 'Non-slip yoga mat with 6mm thickness.', specs: 'PVC Material, 6mm Thick, 68" x 24", Carry Strap' },
  { id: 13, name: 'Dumbbells', price: 1500, image: '/images/dumbell.jpg', description: 'Pair of 5kg dumbbells for home workouts.', specs: '5kg Each, Rubber-Coated, Hex Shape' },
];

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div style={styles.container}>Product not found</div>;
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>← Back to Products</Link>
      <div style={styles.productDetails}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.price}>₹{product.price.toLocaleString()}</p>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.specs}><strong>Specifications:</strong> {product.specs}</p>
          <button onClick={() => addToCart(product)} style={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  backLink: { color: '#00c4cc', textDecoration: 'none', fontSize: '16px', marginBottom: '20px', display: 'inline-block' },
  productDetails: { display: 'flex', background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', gap: '20px' },
  image: { width: '300px', height: '300px', objectFit: 'cover', borderRadius: '5px' },
  info: { flex: 1 },
  name: { fontSize: '28px', margin: '0 0 10px' },
  price: { fontSize: '24px', color: '#00c4cc', margin: '0 0 15px' },
  description: { fontSize: '16px', margin: '0 0 15px', color: '#555' },
  specs: { fontSize: '14px', margin: '0 0 20px', color: '#777' },
  button: { background: '#00c4cc', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' },
};

export default ProductDetails;