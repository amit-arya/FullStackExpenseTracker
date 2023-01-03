const path = require('path');

const express = require('express');

const adminController = require('./admin-controller');

const router = express.Router();

router.get('/get-expense/:id', adminController.getEditExpense);

router.get('/get-expenses', adminController.getExpenses);

router.post('/add-expense', adminController.postAddExpense);

router.delete('/delete-expense/:id', adminController.deleteExpense);

module.exports = router;