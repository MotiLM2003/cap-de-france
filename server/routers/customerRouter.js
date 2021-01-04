const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {
  registerCustomer,
  getByOwner,
} = require('../controllers/customerControllers');
router.post('/register', auth, registerCustomer);
router.post('/get-by-owner', auth, getByOwner);

// create fake customers (temporary)

const faker = require('faker');
const Customer = require('../models/Customer');
const User = require('../models/user.js');
const campaign = [
  'nat',
  'toto',
  'portql',
  'toto c',
  'arface',
  'toto luxe',
  'toto wiski',
  'tot luxe 2',
  'frefre',
];

const status = [
  'new',
  'bad number',
  'vip',
  'not interested',
  'No answer 2',
  'No answer 3',
  'deposit',
  'callback',
  'interested',
];
router.post('/createfake', async (req, res) => {
  for (let i = 0; i < 52510; i++) {
    const customerTemplate = {
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
      'owner': '5ff1ce8dd6618c433cd7e123',
    };

    const use = new Customer(customerTemplate);
    const cus = new User(customerTemplate);
    const customer = await cus.save();
    const user = await use.save();
  }
  const fake = faker.name.firstName();
  res.send(' creating fakes' + fake);
});

module.exports = router;
