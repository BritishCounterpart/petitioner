const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            // match User
            Users.findOne({email: { $regex: new RegExp(`^${email}$`, 'i') } })
                .then(user => {
                    if(!user) {
                        return done(null, false, {message: 'Email Not Registered'});
                    }
                    // match password
                    bcrypt.compare(password, user.password, (error, isMatched) => {
                        if(error) throw error;

                        if(isMatched) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Password Incorrect'})
                        }
                    });
                })
                .catch(error => console.log(error));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Users.findById(id,(err, user) => {
            done(err, user);
        });
    });
}