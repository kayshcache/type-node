"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const createMessage_1 = require("./src/controllers/createMessage");
const settings_1 = require("./settings");
const dotenv = require("dotenv");
dotenv.config();
const dbUserPass = process.env.DB_CREDENTIALS;
const app = express();
// instance of messager class
let messages = new createMessage_1.default(settings_1.Settings.PORT);
// Mongoose connection
mongoose.connect(`mongodb+srv://${dbUserPass}@coder-g8zwo.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Body Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
crmRoutes_1.default(app);
//function with interface
const nameCreator = (name) => {
    return `Hello, ${name.firstName},`;
};
let myName = { firstName: 'Manny' };
// Serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(messages.messagePrint()));
app.listen(settings_1.Settings.PORT, () => console.log(nameCreator(myName), messages.messagePrint()));