const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const generateAuthToken = async (user) => {
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );

  user.tokens = user.tokens || []; // Initialize `tokens` property if it doesn't exist
  user.tokens.push({ token }); // Add the new token to the `tokens` array
  await user.save();

  return token;
};

const signUp = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  const token = await generateAuthToken(user);

  return { user, token };
};

const signIn = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login, wrong Password');
    }

    const token = await generateAuthToken(user);
    return { user, token };
};

const getUserIdFromToken = (token) => {
    try {
      if (!token) {
        return null;
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded._id;
    } catch (error) {
      return null;
    }
  };

module.exports = { generateAuthToken, signIn, signUp, getUserIdFromToken };