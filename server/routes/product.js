module.exports = function(app) {
    const controller = app.controllers.product;

    app.get('/api/products/:id', controller.get);
    app.get('/api/products', controller.getAll);
    app.post('/api/products', controller.create);
    app.put('/api/products', controller.update);
    app.delete('/api/products/:id', controller.remove);
}
