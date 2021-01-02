"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = new express.Router();

var _require = require('../controllers/userController'),
    addUser = _require.addUser,
    initLogin = _require.initLogin,
    getAllUsers = _require.getAllUsers,
    logOut = _require.logOut,
    logOutAll = _require.logOutAll,
    validateToken = _require.validateToken;

router.post('/login', initLogin);
router.post('/validateToken', validateToken);
router.post('/', addUser);
router.get('/', auth, getAllUsers);
router.post('/logout', auth, logOut);
router.post('/logoutAll', auth, logOutAll);
module.exports = router;