"use strict";

var express = require('express');

var cors = require('cors');

var cookieParser = require('cookie-parser');

require('./db/mongoose');

var userRouter = require('./routers/userRouter');

var customerRouter = require('./routers/customerRouter');

var commentRouter = require('./routers/commentsRouter');

var app = express();
var PORT = process.env.PORT || 5000;
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/customers', customerRouter);
app.use('/comments/', commentRouter);
app.listen(PORT, function () {
  console.log("Server is up and listening on port ".concat(PORT));
});