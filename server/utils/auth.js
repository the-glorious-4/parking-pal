require('dotenv').config(); 

const jwt = require('jsonwebtoken');
// const secret = 'mysecretsTokenStringss';  //for local run use this secret - replace process.env.SECRETKEY
// const expiration = '2h'; //process.env.EXPIRATIONTIME 

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    console.log("token", token)


    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.SECRETKEY, { maxAge: process.env.EXPIRATIONTIME });
      req.user = data;
    }
    catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign(
      { data: payload },
      secret,
      { expiresIn: expiration }
    );
  }
};