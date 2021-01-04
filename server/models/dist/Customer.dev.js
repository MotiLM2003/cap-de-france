'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    'default': function _default() {
      return new Date();
    },
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    'default': 0,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  realDeposit: {
    type: Number,
    'default': 0,
  },
  campaign: {
    type: String,
    'default': 0,
  },
  userPassword: {
    type: String,
    required: true,
    trim: true,
  },
});

customerSchema.statics.getByOwner = function _callee() {
  var filters,
    customers,
    _args = arguments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          filters =
            _args.length > 0 && _args[0] !== undefined
              ? _args[0]
              : {
                  firstName: '',
                };
          filters = buildFilter(filters); // need to specify a user;

          _context.next = 4;
          return regeneratorRuntime.awrap(
            Customer.find(filters).populate('owner')
          );

        case 4:
          customers = _context.sent;
          return _context.abrupt('return', customers);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  });
};

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

var buildFilter = function buildFilter(f) {
  var filter = {};

  if (f.status !== '0') {
    filter = _objectSpread({}, filter, {
      status: f.status - 1,
    });
  }

  if (f.country !== '0') {
    filter = _objectSpread({}, filter, {
      country: f.country,
    });
  }

  if (f.campaign !== '0') {
    filter = _objectSpread({}, filter, {
      campaign: f.campaign - 1,
    });
  }

  if (f.lastName !== '') {
    filter = _objectSpread({}, filter, {
      lastName: {
        $regex: f.lastName,
        $options: 'i',
      },
    });
  }

  if (f.firstName !== '') {
    filter = _objectSpread({}, filter, {
      firstName: {
        $regex: f.firstName,
        $options: 'i',
      },
    });
  }

  if (f.phone !== '') {
    filter = _objectSpread({}, filter, {
      phone: {
        $regex: f.phone,
        $options: 'i',
      },
    });
  }

  if (f.email !== '') {
    filter = _objectSpread({}, filter, {
      email: {
        $regex: f.email,
        $options: 'i',
      },
    });
  }

  if (f.startDate !== '') {
    var startDate = f.startDate; // new Date(new Date(f.startDate).setHours(00, 00, 00));

    filter = _objectSpread({}, filter, {
      createAt: {
        $gte: startDate,
      },
    });
  }

  if (f.endDate !== '') {
    var endDate = new Date(new Date(f.endDate).setHours(23, 59, 59));
    filter = _objectSpread({}, filter, {
      createAt: {
        $lt: endDate,
      },
    });
  }

  return filter;
};
