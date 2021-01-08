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

const updateById = async ({ body }, res) => {
  const { _id, update } = body;
  const data = await Customer.findByIdAndUpdate(_id, update);
  res.json(data);
};

const getCustomerDetails = async (req, res) => {
  const id = req.params.id;
  const data = await Customer.findById(id)
    .populate('owner')
    .populate('comments');
  res.json(data);
};

module.exports = {
  registerCustomer,
  getByOwner,
  updateById,
  getCustomerDetails,
};
