const customersController = require('../controller/customersController.js');
const servicesController = require('../controller/servicesController.js');

module.exports = (app) => {
    app.route('/customers')
        .get(customersController.getAll)
        .post(customersController.createNew)
    app.route("/customers/:id_customer")
        .get(customersController.getById)
        .put(customersController.updateById)
        .delete(customersController.deleteById)

        app.route('/services')
        .get(servicesController.getAll)
        .post(serviceController.createNew)
    app.route("/services/:id_service")
        .get(servicesController.getById)
        .put(servicesController.updateById)
        .delete(servicesController.deleteById)
}