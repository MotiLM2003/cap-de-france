"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user.js');

var addUser = function addUser(req, res) {
  var use, user;
  return regeneratorRuntime.async(function addUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          use = new User(req.body);
          _context.next = 3;
          return regeneratorRuntime.awrap(use.save());

        case 3:
          user = _context.sent;
          res.status(201).send(user);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var initLogin = function initLogin(req, res) {
  var user, token;
  return regeneratorRuntime.async(function initLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context2.sent;
          res.status(202).cookie('token', token, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 1000 * 1000)
          }).send({
            user: user,
            token: token
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(' error', _context2.t0);
          res.status(400).send({
            message: 'could validata credentials',
            error: _context2.t0
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var validateToken = function validateToken(req, res) {
  var token, decoded, user;
  return regeneratorRuntime.async(function validateToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.body.token;
          decoded = jwt.verify(token, 'thisismylife');
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            id: decoded.id,
            'tokens.token': token
          }));

        case 5:
          user = _context3.sent;
          res.send(user);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var getAllUsers = function getAllUsers(req, res) {
  return regeneratorRuntime.async(function getAllUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.send('getting all users!');

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var logOut = function logOut(_ref, res) {
  var user, token;
  return regeneratorRuntime.async(function logOut$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = _ref.user, token = _ref.token;

          try {
            // user.tokens = user.tokens.filter((temp) => temp.token !== token);
            // await user.save();
            res.status(202).send({
              'message': 'logged out'
            });
          } catch (error) {
            res.send('error' + error);
          }

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var logOutAll = function logOutAll(_ref2, res) {
  var user, token;
  return regeneratorRuntime.async(function logOutAll$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          user = _ref2.user, token = _ref2.token;
          _context6.prev = 1;
          user.tokens = user.tokens.filter(function (temp) {
            return false;
          });
          _context6.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          res.status(202).send({
            'message': 'logged out'
          });
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          res.send('error' + _context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = {
  addUser: addUser,
  initLogin: initLogin,
  getAllUsers: getAllUsers,
  logOut: logOut,
  logOutAll: logOutAll,
  validateToken: validateToken
};