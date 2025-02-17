const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`);
    console.log(user);
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    console.log(`Inside deserialize`);
    console.log('Deserialize User Id:- ', id._id);
    try {
        const findUser = await User.findById(id);
        // console.log('desirialize findUser: ', findUser);
        if (!findUser) throw new Error('User Not Found');
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ email: username })
            // console.log(`userName:- "${findUser.name}" \n password:- "${findUser.password}"`);
            if (!findUser) throw new Error("User Not Found");
            if (findUser.password !== password) throw new Error("Incorrect password");
            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })
);

module.exports = passport;