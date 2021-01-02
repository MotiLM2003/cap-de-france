const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('tokebn', token);
    const decoded = jwt.verify(token, 'thisismylife');
    const user = await User.findOne({ id: decoded.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ 'error': 'Please authenticaste.' });
  }
};

module.exports = auth;
