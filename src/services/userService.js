const User = require('../models/User');

const createUser = async (userData)=> {
    const user = new User(userData);
    await user.save();
    return user;
};

const updateUser = async (userId, updates) => {
    const user = await User.findById(userId);

    if(!user) {
        throw new Error('User not found');
    }

    Object.keys(updates).forEach((update) => (user[update] = updates[update]));
    await user.save();

    return user;
};

const deleteUser = async (UserId) => {
    const user = await User.findByIdAndDelete(userId);

    if(!user) {
        throw new Error('User not found');
    }

    return user;
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if(!user) {
        throw new Error('User not found');
    }

    return user;
};

module.exports = { createUser, updateUser, deleteUser, getUserById };