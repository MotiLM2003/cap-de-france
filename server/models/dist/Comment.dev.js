"use strict";

var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    "default": function _default() {
      return new Date();
    }
  },
  comment: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

commentSchema.statics.getAllByOwner = function _callee() {
  var filters,
      customers,
      _args = arguments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filters = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _context.next = 3;
          return regeneratorRuntime.awrap(Comment.find(filters).populate('addedBy'));

        case 3:
          customers = _context.sent;
          return _context.abrupt("return", customers);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;