"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user.js');

var auth = function auth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.header('Authorization').replace('Bearer ', '');
          console.log('tokebn', token);
          decoded = jwt.verify(token, 'thisismylife');
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            id: decoded.id,
            'tokens.token': token
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          throw new Error();

        case 9:
          req.user = user;
          req.token = token;
          next();
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          res.status(401).send({
            'error': 'Please authenticaste.'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = auth;