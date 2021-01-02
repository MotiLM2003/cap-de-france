const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const addUser = async (req, res) => {
  const use = new User(req.body);
  const user = await use.save();
  res.status(201).send(user);
};

const initLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res
      .status(202)
      .cookie('token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 1000 * 1000),
      })
      .send({ user, token });
  } catch (error) {
    console.log(' error', error);
    res.status(400).send({ message: 'could validata credentials', error });
  }
};

const validateToken = async (req, res) => {
  try {
    const token = req.body.token;

    const decoded = jwt.verify(token, 'thisismylife');
    const user = await User.findOne({ id: decoded.id, 'tokens.token': token });
    res.send(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllUsers = async (req, res) => {
  res.send('getting all users!');
};

const logOut = async ({ user, token }, res) => {
  try {
    // user.tokens = user.tokens.filter((temp) => temp.token !== token);
    // await user.save();
    res.status(202).send({ 'message': 'logged out' });
  } catch (error) {
    res.send('error' + error);
  }
};

const logOutAll = async ({ user, token }, res) => {
  try {
    user.tokens = user.tokens.filter((temp) => false);
    await user.save();
    res.status(202).send({ 'message': 'logged out' });
  } catch (error) {
    res.send('error' + error);
  }
};

module.exports = {
  addUser,
  initLogin,
  getAllUsers,
  logOut,
  logOutAll,
  validateToken,
};
