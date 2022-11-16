const express = require('express');
const Router = express.Router();
const { main, createForm, fetchFormNameAndID, deleteForm, fetchForm } = require('../controllers/lexiconStudio');
const {test, convert, render} = require ('../controllers/parserEngine');

Router.post("/lexiconStudio/saveForm", createForm);
Router.get("/lexiconStudio/fetchFormNameAndID", fetchFormNameAndID);
Router.delete("/lexiconStudio/deleteForm/:formID", deleteForm);
Router.get(`/lexiconStudio/fetchForm/:formID`, fetchForm);
Router.get(`/`, main);
Router.get(`/convert`, convert);
Router.get(`/render`, render);



Router.get(`/test`, test);
module.exports = Router;
