const User = require('../../models/User');
const CustomError = require('../../utils/HttpError');

async function deleteUser(userId){
    const categoryUser = await User.findByIdAndDelete(userId);
    if (!categoryUser) throw new CustomError("user not found", 404);
    return {};
}

module.exports = deleteUser

