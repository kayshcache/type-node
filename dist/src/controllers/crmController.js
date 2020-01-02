"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crmModels_1 = require("../models/crmModels");
const Contact = mongoose.model('Contact', crmModels_1.ContactSchema);
exports.addNewContact = (req, res) => {
    let newContact = new Contact(req.body);
    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
exports.getContacts = (req, res) => {
    // Can pass search params as an object
    // Second arg is callback function declaration
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
exports.getContactWithId = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
exports.updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
exports.deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactId }, err => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted message' });
    });
};
