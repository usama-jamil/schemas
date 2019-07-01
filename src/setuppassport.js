const passport = require("passport");
const localStratergy = require("passport-local").Strategy;

const User = require("./models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "login",
    new localStratergy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        // if (!user.validPassword(password)) {
        //   return done(null, false, { message: "Incorrect password." });
        // }
        // return done(null, user);

        user.checkPassword(password, function(err, isMatch) {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password." });
          }
        });
      });
    })
  );
};
