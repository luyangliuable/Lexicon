const fs = require("fs");
const path = require('path');
const pdf = require('pdf-parse');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const ParsingEngine = require("../core/parser.js");
const Guide = require('../models/guide');
const Form = require('../models/form');

exports.upload = async (req, res, next) => {
    return res.status(200).json({ result: "done", files: req.files });
};


exports.convert = async (req, res, next) => {
    let dataBuffer = fs.readFileSync("/Users/blackfish/lexicon-client-app/backend/testPdfs/stroke.pdf");

    pdf(dataBuffer).then(function (pdf) {
        return res.status(200).json({
            numberOfPages: pdf.numpages,
            text: pdf.text,
            html: pdf.text.replace(/\n/g, "<br />"),
            metadata: pdf.metapdf
        });
    });
};



exports.uploadGuide = async (req, res, next) => {
    const parsingEngine = new ParsingEngine(req.body.path);
    const rendered = parsingEngine.render();

    rendered.then(data => {
        return res.status(200).send(data);
    });
};


exports.test = async (req, res, next) => {
    let dataBuffer = fs.readFileSync("/Users/blackfish/lexicon-client-app/backend/testPdfs/stroke.pdf");

    pdf(dataBuffer).then(function (pdf) {
        ///////////////////////////////////////////////////////////////////////////
        //                                Parsinig                               //
        ///////////////////////////////////////////////////////////////////////////
        const replacements = [["Table Of Contents"]];
        let tmp = pdf.text.replace(/Table of Contents/gi, "<h3><b>Table Of Contents</b></h3>");
        tmp = tmp.replace(/\w.*\n/m, `<h1>${tmp.match(/\w.*\n/m)}</h1>`);
        tmp = tmp.replace(/Last Reviewed Date:/gi, "<b>Last Reviewed Date:</b>");
        tmp = tmp.replace(/author\/s/gi, "<b>Author/s</b>");
        tmp = tmp.replace(/definitions/gi, "<b>Definitions</b>");
        tmp = tmp.replace(//gi, " ");
        tmp = tmp.replace(/TARGET AUDIENCE and SETTING/gi, "<b>Target Audience and Setting</b>");

        return res.status(200).send(tmp.replace(/\n/g, "</p><p>"));
    });
};


exports.search = async (req, res, next) => {
    if (req.body.value != "") {
        const allResultsGuide = await Guide.find({ $or: [{ name: { $regex: req.body.value + '.*', $options: "i" } }, { tags: { $regex: req.body.value + '.*', $options: "i" } }] });

        const allResultsForm = await Form.find({ name: { $regex: req.body.value + '.*', $options: "i"} });

        for (let i = 0; i < allResultsForm.length; i++) {
            allResultsForm[i].type = "form";
        }

        for (let i = 0; i < allResultsGuide.length; i++) {
            allResultsGuide[i].type = "guide";
        }

        const allResults = allResultsGuide.concat(allResultsForm);
        const result = allResults.slice(0, 3);
        return res.status(200).send({ result: result });
    } else {
        return res.status(200).send({ result: [] });
    }
};

exports.render = async (req, res, next) => {
    if (req.query.id != null) {
        console.log(`searching for guide with id ${req.query.id}`);
        const allResults = await Guide.find({ _id: req.query.id });
        console.log('/' + allResults[0].path);
        // return res.status(200).send('/' + allResults[0].path);
        return res.status(200).sendFile('/Users/blackfish/lexicon-client-app/backend/' + allResults[0].path);
    }
};
