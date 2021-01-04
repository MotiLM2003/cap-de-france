"use strict";

var jwt = require('jsonwebtoken');

var Customer = require('../models/Customer');

var registerCustomer = function registerCustomer(req, res) {
  var cus, customer;
  return regeneratorRuntime.async(function registerCustomer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cus = new Customer(req.body);
          _context.next = 3;
          return regeneratorRuntime.awrap(cus.save());

        case 3:
          customer = _context.sent;
          res.status(201).send(customer);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getByOwner = function getByOwner(req, res) {
  var customers, count;
  return regeneratorRuntime.async(function getByOwner$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Customer.getByOwner(req.body));

        case 2:
          customers = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Customer.getTotalCount(req.body));

        case 5:
          count = _context2.sent;
          res.json({
            customers: customers,
            count: count
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  registerCustomer: registerCustomer,
  getByOwner: getByOwner
};