const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const generateAuthToken = async (user)=> {
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET, {
        expiresIn:'24h',
    });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
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

module.exports = { generateAuthToken, signIn, getUserIdFromToken };