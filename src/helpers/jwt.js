const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid: uid.toString(), name };  
    const secret = process.env.SECRET_JWT_SEED;

    if (!secret) {
      return reject('JWT secret is not defined in environment variables');
    }

    jwt.sign(payload, secret, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        console.error('JWT generation error:', err);
        return reject('Could not generate the token');
      }
      resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
};
