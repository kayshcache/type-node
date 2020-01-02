"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
const routes = (app) => {
    /* Contact Route
     *
     * Here are the GET/POST/PUT/DELETE Endpoints for the "contacts"
     * mongoDB collection
     *
     * */
    app.route('/contact')
        .get((req, res, next) => {
        // Middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    }, crmController_1.getContacts)
        // contact - POST endpoint
        .post(crmController_1.addNewContact);
    app.route('/contact/:contactId')
        // contact ID - GET specific contact by id
        .get(crmController_1.getContactWithId)
        // contact ID - PUT request
        .put(crmController_1.updateContact)
        // contact id - DELETE request
        .delete(crmController_1.deleteContact);
};
exports.default = routes;
