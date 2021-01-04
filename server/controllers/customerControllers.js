const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const registerCustomer = async (req, res) => {
  const cus = new Customer(req.body);
  const customer = await cus.save();

  res.status(201).send(customer);
};

const getByOwner = async (req, res) => {
  const customers = await Customer.getByOwner(req.body);
  const count = await Customer.getTotalCount(req.body);

  res.json({ customers, count });
};

module.exports = {
  registerCustomer,
  getByOwner,
};
