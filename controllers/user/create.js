const User = require('../../models/User');

async function create(params) {
    return await User.create(params);
}

module.exports = create