const inventory = {
  'product123': { name: 'Laptop', stock: 5, price: 999, category: 'electronics' },
  'product456': { name: 'Smartphone', stock: 10, price: 499, category: 'electronics' },
  'product789': { name: 'T-Shirt', stock: 20, price: 29, category: 'clothing' }
};

const orders = {
  '12345': { status: 'shipped', items: ['product123'], date: '2025-03-20' }
};

const faqs = [
  { q: 'refund policy', a: 'Returns within 30 days with receipt.' },
  { q: 'store hours', a: '9 AM - 6 PM, Mon-Sat.' },
  { q: 'shipping', a: 'Standard shipping takes 3-5 days.' }
];

module.exports = { inventory, orders, faqs };