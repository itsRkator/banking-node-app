const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  userId: {
    type: String,
    required: [true, 'Please add a user id'],
  },
  userName: {
    type: String,
    required: [true, 'Please add a user name'],
  },
  userDOB: {
    type: String,
    required: [true, 'Please add a user DOB'],
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);