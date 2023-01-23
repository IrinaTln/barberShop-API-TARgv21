const customersController = require('../controller/customersController.js');
const servicesController = require('../controller/servicesController.js');

module.exports = (app) => {
    app.route('/customers')
        .get(customersController.getAll)
        /*
        .post(customersController.createNew) //Create
    app.route("/customers/:id_customer")
        .get(customersController.getById) //Read
        .put(customersController.updateById)  //Update
        .delete(customersController.deleteById)  //Delete*/

        app.route('/services')
        .get(servicesController.getAll)
        /*.post(servicesController.createNew) //Create
    app.route("/services/:id_service")
        .get(servicesController.getById)  //Read
        .put(servicesController.updateById)  //Update
        .delete(servicesController.deleteById)  //Delete*/
}