"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = new express.Router();

var _require = require('../controllers/customerControllers'),
    registerCustomer = _require.registerCustomer;

router.post('/login', initLogin);