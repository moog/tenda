module.exports = function(app) {
    const ProductModel = app.models.product;

    return {
        get: function(req, res) {
            const id = req.params.id;
            const query = {_id: id};
            const data = { errors: [] };

            ProductModel.findOne(query)
                .select('-__v')
                .exec()
                .then(function(product) {
                    if(!product) {
                        return new Promise(function(resolve, reject) {
                            var message = 'Produto não encontrado.';
                            var error = { field: null, message: message };
                            return reject({errors: [error]})
                        })
                    } else {
                        data.product = product.toObject();
                        res.status(200).json(data);
                    }
                })
                .catch(function(error) {
                    data.errors = error.errors;
                    res.status(200).json(data);
                })
        },
        getAll: function(req, res){
            const title = req.body.title;
            const query = {};
            const data = { errors: [] };

            if(title) {
                query.title = new RegExp(title, 'i');
            }

            ProductModel.find(query)
                .select('-__v')
                .exec()
                .then(function(products) {
                    if(!products) {
                        return new Promise(function(resolve, reject) {
                            var message = 'Nenhum produto encontrado.';
                            var error = { field: null, message: message };
                            return reject({errors: [error]})
                        })
                    } else {
                        data.products = products.map(e => {
                            var obj = e.toObject();
                            obj.amountMeasured = e.amountMeasured;
                            return obj;
                        });
                        res.status(200).json(data);
                    }
                })
                .catch(function(error) {
                    data.errors = error.errors;
                    res.status(200).json(data);
                })
        },
        create: function(req, res) {
            const data = { errors: [] }
            const product = new ProductModel({
                title: req.body.product.title,
                price: req.body.product.price,
                amount: req.body.product.amount,
                measure: req.body.product.measure
            });

            product.save()
                .then(function(product) {
                    console.log(product);

                    data.product = product.toObject();
                    res.status(200).json(data);
                })
                .catch(function(error) {
                    data.errors = error.errors;
                    res.status(200).json(data);
                })
        },
        update: function(req, res) {
            const data = { errors: [] };
            const query = { _id: req.body._id };
            const set = { $set: {
                title: req.body.product.title,
                price: req.body.product.price,
                amount: req.body.product.amount,
                measure: req.body.product.measure
            }};
            const options = {multi: false, upsert: false};

            ProductModel.update(query, set, options)
                .then(function(e) {
                    console.log(e);
                    res.status(200).json(data);
                })
                .catch(function(error) {
                    data.errors = error.errors;
                    res.status(200).json(data);
                });
        },
        remove: function(req, res) {
            const data = {errors: []}
            const query = { _id: req.params.id };

            ProductModel.remove(query)
                .then(function(e) {
                    console.log(e);
                    res.satus(200).json(data);
                })
                .catch(function(error) {
                    data.errors = error.errors;
                    res.status(200).json(data);
                })
        }
    }
}
