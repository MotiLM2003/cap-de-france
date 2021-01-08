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

var updateById = function updateById(_ref, res) {
  var body, _id, update, data;

  return regeneratorRuntime.async(function updateById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          body = _ref.body;
          _id = body._id, update = body.update;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Customer.findByIdAndUpdate(_id, update));

        case 4:
          data = _context3.sent;
          res.json(data);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getCustomerDetails = function getCustomerDetails(req, res) {
  var id, data;
  return regeneratorRuntime.async(function getCustomerDetails$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Customer.findById(id).populate('owner').populate('comments'));

        case 3:
          data = _context4.sent;
          res.json(data);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  registerCustomer: registerCustomer,
  getByOwner: getByOwner,
  updateById: updateById,
  getCustomerDetails: getCustomerDetails
};