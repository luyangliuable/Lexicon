const express = require('express');
const Router = express.Router();
const { main, createForm, fetchFormNameAndID, deleteForm, fetchForm } = require('../controllers/lexiconStudio');
const {upload, test, convert, render} = require ('../controllers/parserEngine');
const multer  = require('multer');
const uploader = multer({ dest: 'uploads/' });

Router.get(`/convert`, convert);
Router.get(`/render`, render);
Router.get(`/test`, test);

Router.post('/upload', uploader.single('pdfFile'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);

    return res.status(200).json({result: "done", files: req.files});
});




module.exports = Router;
