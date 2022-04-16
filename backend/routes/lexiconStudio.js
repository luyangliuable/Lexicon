const express = require('express');
const Router = express.Router();
const { createForm, fetchFormNameAndID, deleteForm, fetchForm } = require('../controllers/lexiconStudio');

Router.post("/lexiconStudio/saveForm", createForm);
Router.get("/lexiconStudio/fetchFormNameAndID", fetchFormNameAndID);
Router.delete("/lexiconStudio/deleteForm/:formID", deleteForm);
Router.get(`/lexiconStudio/fetchForm/:formID`, fetchForm);
module.exports = Router;