const User = require('../../models/User');
const CustomError = require('../../utils/HttpError');

async function update(userId,params) {
    const updateUser = await User.findByIdAndUpdate(userId, params, { new: true });
    if (!updateUser) throw new CustomError("user not found", 404);
    return updateUser
}

module.exports = update;