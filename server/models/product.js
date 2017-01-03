module.exports = function(app) {
    const validator = require('validator');
    const mongoose = require('mongoose');
    const Schema = require('mongoose').Schema;
    const measureListEnum = ['g', 'kg', 'ml', 'l', 'unidade'];

    const ProductSchema = new Schema({
        title: {type: String, required: true, default: ''},
        price: {
            type: Number,
            required: true,
            default: 1,
            get: function(v) {
                console.log('testeeeeeeeeeeeeeeee');
                return (v / 100).toFixed(2);
            },
            set: function(v) {
                return v * 100;
            }
        },
        amount: {type: Number, required: true, default: 1},
        measure: {type: String, enum: measureListEnum, default: 'unidade'}
    });

    ProductSchema.virtual('amountMeasured').get(function() {
        var amountMeasured = this.amount + this.measure;

        switch(this.measure) {
            case 'ml':
                amountMeasured = this.amount + 'mL';
                break;
            case 'l':
                amountMeasured = this.amount + 'L';
                break;
            case 'unidade':
                if(this.amount > 1) {
                    amountMeasured = this.amount + ' unidades';
                } else {
                    amountMeasured = this.amount + ' unidade';
                }
                break;
            default:
                amountMeasured = this.amount + this.measure;
                break;
        }

        return amountMeasured;
    })

    return app.config.db.model('products', ProductSchema);
}
