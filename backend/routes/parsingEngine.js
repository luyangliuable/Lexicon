const express = require('express');
const Router = express.Router();
const { main, createForm, fetchFormNameAndID, deleteForm, fetchForm } = require('../controllers/lexiconStudio');
const {upload, test, convert, render} = require ('../controllers/parserEngine');

Router.get(`/convert`, convert);
Router.get(`/render`, render);
Router.get(`/test`, test);
Router.get(`/upload`, upload);


module.exports = Router;
