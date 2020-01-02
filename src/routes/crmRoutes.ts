import { addNewContact, getContacts, getContactWithId, updateContact, deleteContact } from '../controllers/crmController';

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
		console.log(`Request from: ${req.originalUrl}`)
		console.log(`Request type: ${req.method}`)
		next();
	}, getContacts)

	// contact - POST endpoint
	.post(addNewContact);

	app.route('/contact/:contactId')

	// contact ID - GET specific contact by id
	.get(getContactWithId)

	// contact ID - PUT request
	.put(updateContact)

	// contact id - DELETE request
	.delete(deleteContact)
}

export default routes;
