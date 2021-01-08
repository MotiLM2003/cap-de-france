"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = new express.Router();

var _require = require('../controllers/commentsController'),
    save = _require.save,
    deleteComment = _require.deleteComment,
    getAllByOwner = _require.getAllByOwner;

router.post('/', auth, save);
router["delete"]('/delete/:id', auth, deleteComment);
router.get('/:id', auth, getAllByOwner);
module.exports = router;