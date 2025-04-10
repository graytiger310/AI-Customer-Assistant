// Mock external API for shipping updates
const getShippingUpdate = async (orderId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Shipping update for order ${orderId}: In transit, expected delivery in 2 days.`);
      }, 1000);
    });
  };
  
  module.exports = { getShippingUpdate };