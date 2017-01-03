// module.exports = function(app) {
//     const validator = require('validator');
//     const mongoose = require('mongoose');
//     const Schema = require('mongoose').Schema;
//     const transactionTypeListEnum = ['debit', 'credit']
//     const paymentTypeListEnum = ['debit-card', 'credit-card', 'money']
//
//     const TransactionSchema = new Schema({
//         transactionType: {type: String, enum: transactionTypeListEnum, default: 'debit'},
//         paymentType: {type: String, enum: paymentTypeListEnum, default: 'money'}
//     })
// }
