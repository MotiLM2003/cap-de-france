"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = new express.Router();

var _require = require('../controllers/customerControllers'),
    registerCustomer = _require.registerCustomer,
    getByOwner = _require.getByOwner,
    updateById = _require.updateById,
    getCustomerDetails = _require.getCustomerDetails;

router.post('/register', auth, registerCustomer);
router.post('/get-by-owner', auth, getByOwner);
router.patch('/update', auth, updateById);
router.get('/details/:id', auth, getCustomerDetails); // create fake customers (temporary)

var faker = require('faker');

var Customer = require('../models/Customer');

var User = require('../models/user.js');

var campaign = ['nat', 'toto', 'portql', 'toto c', 'arface', 'toto luxe', 'toto wiski', 'tot luxe 2', 'frefre'];
var status = ['new', 'bad number', 'vip', 'not interested', 'No answer 2', 'No answer 3', 'deposit', 'callback', 'interested'];
router.post('/createfake', function _callee(req, res) {
  var i, customerTemplate, use, cus, customer, user, fake;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < 52510)) {
            _context.next = 14;
            break;
          }

          customerTemplate = {
            'firstName': faker.name.firstName(),
            'lastName': faker.name.lastName(),
            'email': faker.internet.email(),
            'phone': faker.phone.phoneNumberFormat(),
            'userName': faker.internet.userName(),
            'userPassword': faker.internet.password(),
            'country': faker.address.country(0),
            'isAgreed': 'true',
            'campaign': Math.floor(Math.random() * campaign.length),
            'status': Math.floor(Math.random() * status.length),
            'owner': '5ff1ce8dd6618c433cd7e123'
          };
          use = new Customer(customerTemplate);
          cus = new User(customerTemplate);
          _context.next = 7;
          return regeneratorRuntime.awrap(cus.save());

        case 7:
          customer = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(use.save());

        case 10:
          user = _context.sent;

        case 11:
          i++;
          _context.next = 1;
          break;

        case 14:
          fake = faker.name.firstName();
          res.send(' creating fakes' + fake);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;