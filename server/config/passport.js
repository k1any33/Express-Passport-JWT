const User = require('../models/User.js');
const JwtStrategy = require('passport-jwt').Strategy;
const secretKey = require('./keys.js').secretKey;

var cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secretKey;

const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({ _id: jwt_payload.id })
    .then((user) => {
      if (user) return done(null, user);
      return done(null, false);
    })
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(jwtStrategy);
};
