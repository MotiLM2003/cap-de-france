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

var Comment = require('../models/Comment');

var save = function save(req, res) {
  var temp, commentModal, comment;
  return regeneratorRuntime.async(function save$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          temp = _objectSpread({}, req.body, {
            addedBy: req.user._id,
          });
          commentModal = new Comment(temp);
          _context.next = 4;
          return regeneratorRuntime.awrap(commentModal.save());

        case 4:
          comment = _context.sent;
          res.status(201).send(comment);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  });
};

var deleteComment = function deleteComment(req, res) {
  var id, data;
  return regeneratorRuntime.async(function deleteComment$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(
            Comment.deleteOne({
              _id: id,
            })
          );

        case 3:
          data = _context2.sent;
          res.send(data);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  });
};

var getAllByOwner = function getAllByOwner(req, res) {
  var id, data;
  return regeneratorRuntime.async(function getAllByOwner$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(
            Comment.getAllByOwner({
              owner: id,
            })
          );

        case 3:
          data = _context3.sent;
          res.send(data);

        case 6:
        case 'end':
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  save: save,
  deleteComment: deleteComment,
  getAllByOwner: getAllByOwner,
};
