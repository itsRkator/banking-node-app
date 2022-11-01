const express = require('express');

const Transaction = require('../models/transaction');
const router = express.Router();

router.get('', (req, res, next) => {
  Transaction.find().then((documents, err) => {
    if (err) {
      res.status(500).json({
        message: 'Fetching transactions failed!'
      });
    } else {
      res.status(200).json({
        message: 'Transactions fetched successfully!',
        transactions: documents
      });
    }
  });
});

router.post('/create', (req, res, next) => {
  console.log(req.body);
  const transaction = new Transaction({
    amount: 0.00,
    userId: req.body.userId,
    userName: req.body.userName,
    userDOB: req.body.userDOB
  });
  console.log(transaction);
  console.log(transaction.userId);
  let duplicate = false;
  Transaction.findOne({ userId: transaction.userId }).then((document, err) => {
    if (err) {
      res.status(500).json({
        message: 'Fetching transactions failed!'
      });
    } else {
      if (document) {
        duplicate = true;
        res.status(200).json({
          message: 'User already exists!'
        });
      } else {
        transaction.save().then((createdTransaction, err) => {
          if (err) {
            res.status(500).json({
              message: 'Creating a transaction failed!'
            });
          } else {
            res.status(201).json({
              message: 'Transaction added successfully',
            });
          }
        });
      }
    }
  });
});

router.put('/withdraw', (req, res, next) => {
  const userId = req.body.userId;
  const amount = +req.body.amount;
  if (amount <= 0) {
    res.status(200).json({ message: 'Invalid amount!' });
  }
  Transaction.findOne({ userId: userId }).then((transaction, err) => {
    if (err) {
      res.status(500).json({ message: 'Fetching transaction failed!' });
    } else {
      if (!transaction) {
        res.status(200).json({ message: 'User does not exist!' });
      } else {
        if (transaction.amount >= amount) {
          transaction.amount = transaction.amount - amount;
          transaction.save().then(updatedTransaction => {
            res.status(200).json({
              message: 'Transaction updated successfully',
              transaction: updatedTransaction
            });
          });
        } else {
          res.status(200).json({
            message: 'Insufficient Balance'
          });
        }
      }
    }
  });
});

router.put('/deposit', (req, res, next) => {
  const userId = req.body.userId;
  const amount = +req.body.amount;
  if (amount <= 0) {
    res.status(200).json({ message: 'Invalid Amount' });
  }
  Transaction.findOne({ userId: userId }).then((transaction, err) => {
    if (err) {
      res.status(500).json({ message: 'Fetching transaction failed!' });
    } else {
      if (!transaction) {
        res.status(200).json({ message: 'User does not exist!' });
      } else {
        transaction.amount = transaction.amount + amount;
        transaction.save().then(updatedTransaction => {
          res.status(200).json({
            message: 'Transaction updated successfully',
            transaction: updatedTransaction
          });
        });
      }
    }
  });
});

router.delete('delete', (req, res, next) => {
  Transaction.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Transaction deleted!' });
  });
});

module.exports = router;