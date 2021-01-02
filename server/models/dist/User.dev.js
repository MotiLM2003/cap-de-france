"use strict";

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userPassword: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.userPassword;
  delete userObject.tokens;
  delete userObject.__v;
  return userObject;
};

userSchema.methods.generateAuthToken = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          _context.next = 3;
          return regeneratorRuntime.awrap(jwt.sign({
            _id: user._id.toString()
          }, 'thisismylife', {
            expiresIn: '365 days'
          }));

        case 3:
          token = _context.sent;

          try {
            user.tokens = user.tokens.concat({
              token: token
            });
            ' saving';
            user.save();
          } catch (error) {}

          return _context.abrupt("return", token);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByCredentials = function _callee2(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", {
            message: 'unable to log in email'
          });

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.userPassword));

        case 7:
          isMatch = _context2.sent;

          if (!isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", user);

        case 12:
          throw new Error('unable to login');

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

userSchema.pre('save', function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = this;

          if (!user.isModified('userPassword')) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.userPassword, 8));

        case 4:
          user.userPassword = _context3.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model('Users', userSchema);
module.exports = User;