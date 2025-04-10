const { addUser, getDb } = require('../config/sqlite');

const products = [
  { id: 1, name: "Laptop", price: 74999, stock: 10 },
  { id: 2, name: "Headphones", price: 4999, stock: 25 },
  { id: 3, name: "Smartphone", price: 52499, stock: 15 },
  { id: 4, name: "Smartwatch", price: 14999, stock: 20 },
  { id: 5, name: "Tablet", price: 29999, stock: 12 },
];

const storePolicies = {
  shipping: "Free shipping on orders over ₹500. Standard delivery takes 3-5 business days.",
  refund: "Refunds accepted within 30 days of purchase with original receipt. Contact support to initiate.",
};

const getAIResponse = async (message, history, session, username) => {
  console.log('Generating AI response for:', message);

  try {
    const userId = await addUser(username);
    const db = await getDb();

    if (message === 'past_orders') {
      const orders = await db.all('SELECT * FROM orders WHERE user_id = ? AND status != "Cancelled"', userId);
      return { reply: orders.length ? orders.map(o => `${o.product_name} (Order #${o.order_id})`).join(', ') : 'No past orders found.' };
    } else if (message === 'cancelled_orders') {
      const cancelled = await db.all('SELECT * FROM orders WHERE user_id = ? AND status = "Cancelled"', userId);
      return { reply: cancelled.length ? cancelled.map(o => `${o.product_name} (Order #${o.order_id})`).join(', ') : 'No cancelled orders found.' };
    } else if (message === 'order_statuses') {
      const orders = await db.all('SELECT order_id FROM orders WHERE user_id = ?', userId);
      return { reply: orders.length ? 'Select an order: ' + orders.map(o => `Order #${o.order_id}`).join(', ') : 'No orders found.' };
    } else if (message.startsWith('status_')) {
      const orderId = message.split('_')[1];
      const order = await db.get('SELECT status FROM orders WHERE user_id = ? AND order_id = ?', userId, orderId);
      return { reply: order ? `Order #${orderId} Status: ${order.status}` : 'Order not found.' };
    }

    const msg = message.toLowerCase().trim();
    if (msg.includes("product") || msg.includes("items")) {
      const productList = products.map(p => `${p.name} (₹${p.price}) - ${p.stock} in stock`).join(", ");
      return { reply: `Hi ${username}! We sell: ${productList}.` };
    } else if (msg.includes("order status")) {
      return { reply: `Hi ${username}! Select "Order Statuses" to view your orders.` };
    } else if (msg.includes("refund")) {
      return { reply: `Hi ${username}! ${storePolicies.refund}` };
    } else if (msg.includes("policy") || msg.includes("shipping")) {
      return { reply: `Hi ${username}! ${storePolicies.shipping} For refunds: ${storePolicies.refund}` };
    } else {
      return { reply: `Hi ${username}! Please select an option below.` };
    }
  } catch (error) {
    console.error('Error in getAIResponse:', error.message);
    throw new Error('Failed to generate AI response');
  }
};

module.exports = { getAIResponse };