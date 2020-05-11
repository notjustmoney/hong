const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('../config/config');
const { User } = require('../models');


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
}
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false, { message: 'cannot found matched user' });
    }
    done(null, user);
  } catch (error) {
    done(error, false, { message: 'query error ocuured: ' + error });
  }
};

const jwtStrategy = new JwtStrategy(opts, jwtVerify);

module.exports = {
  jwtStrategy,
};