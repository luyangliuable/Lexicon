const express = require('express');
const Router = express.Router();
const { main, createForm, fetchFormNameAndID, deleteForm, fetchForm } = require('../controllers/lexiconStudio');
const {search, upload, test, convert, render} = require ('../controllers/parserEngine');
const multer  = require('multer');
const uploader = multer({ dest: 'uploads/' });
const ParsingEngine = require("../core/parser.js");
const Guide = require('../models/guide');

Router.get(`/convert`, convert);
Router.get(`/render`, render);
Router.get(`/test`, test);

// Router.post(`/render`, render);
Router.post(`/search`, search);
Router.post('/upload', uploader.single('pdfFile'), function (req, res, next) {
    const parsingEngine = new ParsingEngine(req.file.path);
    const pdfName = parsingEngine.getPDFName();

    pdfName.then(data => {
        console.log();
        const tags = [];
        for (var item of req.body.tags.split(/[, ]/)) {
            if (item != "") {
                tags.push(item);
            }
        }
        console.log(tags);

        const new_form = new Guide({
            ...req.file,
            name: data,
            tags: tags
        });

        new_form.save((err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else {
                return res.status(200).json({ ...result._doc, _id: result.id });
            }
        });
    });
});

module.exports = Router;
