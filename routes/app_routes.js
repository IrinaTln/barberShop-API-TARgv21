const customersController = require('../controller/customersController.js');
const servicesController = require('../controller/servicesController.js');
const barbersController = require('../controller/barbersController.js');
const bookingsController = require('../controller/bookingsController.js');

module.exports = (app) => {
    app.route('/customers')
        .get(customersController.getAll)
        .post(customersController.createNew) //Create */
        app.route("/customers/:id_customer")
        .get(customersController.getById) //Read
        .put(customersController.updateById)  //Update
        .delete(customersController.deleteById)  //Delete

    app.route('/services')
        .get(servicesController.getAll)
        .post(servicesController.createNew) //Create
        app.route("/services/:id_service")
        .get(servicesController.getById)  //Read
        .put(servicesController.updateById)  //Update
        .delete(servicesController.deleteById)  //Delete 

    app.route('/barbers')
        .get(barbersController.getAll)
        .post(barbersController.createNew) //Create
        app.route("/barbers/:id_barber")
        .get(barbersController.getById)  //Read
        .put(barbersController.updateById)  //Update
        .delete(barbersController.deleteById)  //Delete 
    
    app.route('/bookings')
        .get(bookingsController.getAll)
        .post(bookingsController.createNew) //Create
        app.route("/bookings/:id_booking")
        .get(bookingsController.getById)  //Read
        .put(bookingsController.updateById)  //Update
        .delete(bookingsController.deleteById)  //Delete 
}