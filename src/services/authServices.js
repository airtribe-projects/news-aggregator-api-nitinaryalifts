const bcrypt = require('bcrypt');
const User = require('../models/user');

const authenticate = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return user;
};

module.exports = { authenticate };
