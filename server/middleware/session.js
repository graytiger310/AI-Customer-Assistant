const session = require('express-session');
const MemoryStore = require('memorystore')(session);

module.exports = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: 86400000 }), // 24 hours
  cookie: { maxAge: 86400000 }
});