"use strict";

// const connection =
//   'mongodb+srv://moti:data3enterWordpress@cluster0.7tihz.mongodb.net/data-center?retryWrites=true&w=majority';
var connection = 'mongodb://127.0.0.1:27017/data-center';

var mongoose = require('mongoose');

var options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true
};
mongoose.connect(connection, options, function () {
  console.log('connected to database');
});