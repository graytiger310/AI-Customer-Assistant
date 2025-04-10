const { getUserId } = require('../config/sqlite');

const trackInteraction = async (username, intent) => {
  const userId = await getUserId(username);
  if (userId) {
    await require('../config/sqlite').saveAnalytics(userId, intent);
  }
};

module.exports = { trackInteraction };