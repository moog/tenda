module.exports = function(app) {
    const mongoose = require('mongoose');
    const Promise = require('bluebird');

    mongoose.Promise = Promise;

    return mongoose.connect('mongodb://localhost/tenda');
};
