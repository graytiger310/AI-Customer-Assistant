import React, { useState } from 'react';

const initialProducts = [
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

const AdminPanel = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', description: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result }); // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id, ...newProduct, price: parseFloat(newProduct.price) }]);
    setNewProduct({ name: '', price: '', image: '', description: '' });
  };

  const handleUpdateProduct = (id) => {
    const productToUpdate = products.find((p) => p.id === id);
    const updated = prompt(
      'Update product (name,price,description):',
      `${productToUpdate.name},${productToUpdate.price},${productToUpdate.description}`
    );
    if (updated) {
      const [name, price, description] = updated.split(',');
      const updatedProduct = { name, price: parseFloat(price), description };
      // For image update, we'll keep the existing image unless a new one is uploaded separately
      setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
    }
  };

  const handleUpdateImage = (id) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProducts(products.map((p) => (p.id === id ? { ...p, image: reader.result } : p)));
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Admin Panel</h2>
      <form onSubmit={handleAddProduct} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.fileInput}
          required
        />
        {newProduct.image && (
          <img src={newProduct.image} alt="Preview" style={styles.previewImage} />
        )}
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      <h3>Manage Products</h3>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>₹{product.price.toLocaleString()}</p>
            <p style={styles.description}>{product.description}</p>
            <div style={styles.actions}>
              <button
                onClick={() => handleUpdateProduct(product.id)}
                style={styles.actionButton}
              >
                Update Details
              </button>
              <button
                onClick={() => handleUpdateImage(product.id)}
                style={styles.actionButton}
              >
                Update Image
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                style={styles.actionButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', borderRadius: '5px', border: '1px solid #e0e0e0' },
  fileInput: { padding: '8px 0' }, // Minimal styling for file input
  previewImage: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', margin: '10px 0' },
  button: { background: '#00c4cc', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: '500' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  productCard: { background: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' },
  image: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' },
  name: { fontSize: '18px', margin: '10px 0 5px', color: '#333' },
  price: { fontSize: '16px', color: '#00c4cc', margin: '0' },
  description: { fontSize: '14px', color: '#666', margin: '5px 0' },
  actions: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '5px', marginTop: '10px' },
  actionButton: { background: '#007bff', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '5px', cursor: 'pointer', flex: '1', minWidth: '80px' },
};

export default AdminPanel;