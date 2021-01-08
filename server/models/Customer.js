const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    createAt: { type: Date, default: () => new Date() },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: Number, default: 0 },
    email: { type: String, required: true },
    country: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    realDeposit: { type: Number, default: 0 },
    campaign: { type: String, default: 0 },
    userPassword: { type: String, required: true, trim: true },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

customerSchema.virtual('comments', {
  ref: 'Comments',
  localField: '_id',
  foreignField: 'owner',
});

customerSchema.statics.getByOwner = async ({
  filters = { firstName: '' },
  page,
  limit,
  orderBy,
}) => {
  filters = buildFilter(filters);
  let startIndex = (page - 1) * limit;
  const endIntex = page * limit;
  // need to specify a user;
  if (startIndex < 0) startIndex = 0;
  const customers = await Customer.find(filters)
    .sort(orderBy)
    .populate('comments', (err, item) => {})
    .populate('owner')
    .limit(limit)
    .skip(startIndex);

  return customers;
};

customerSchema.statics.getTotalCount = async ({ filters }) => {
  return Customer.countDocuments(buildFilter(filters));
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

const buildFilter = (f) => {
  let filter = {};
  if (f.status !== '0') {
    filter = { ...filter, status: f.status - 1 };
  }
  if (f.country !== '0') {
    filter = { ...filter, country: f.country };
  }
  if (f.campaign !== '0') {
    filter = { ...filter, campaign: f.campaign - 1 };
  }
  if (f.lastName !== '') {
    filter = { ...filter, lastName: { $regex: f.lastName, $options: 'i' } };
  }
  if (f.firstName !== '') {
    filter = { ...filter, firstName: { $regex: f.firstName, $options: 'i' } };
  }

  if (f.phone !== '') {
    filter = { ...filter, phone: { $regex: f.phone, $options: 'i' } };
  }

  if (f.email !== '') {
    filter = { ...filter, email: { $regex: f.email, $options: 'i' } };
  }

  if (f.startDate) {
    const startDate = new Date(new Date(f.startDate).setHours(00, 00, 00));
    filter = {
      ...filter,
      createAt: { $gte: startDate },
    };
  }

  if (f.endDate) {
    const endDate = new Date(new Date(f.endDate).setHours(23, 59, 59));
    filter = {
      ...filter,
      createAt: { $lt: endDate },
    };
  }
  return filter;
};
