const fs = require("fs");
const path = require('path');
const pdf = require('pdf-parse');
// const a = require("pdfparser.js");


class ParsingEngine {
    constructor(pdflocation) {
        this.pdflocation = pdflocation;
        this.rawdata = fs.readFileSync(pdflocation);

        this.pdf = pdf(this.rawdata);
    }

    get pdfLocation() {
        return this.pdflocation;
    }

    async render() {
        const pdf = await this.pdf;
        var text = pdf.text;
        text = text.replace(/\n/g, "<br /> ");
        console.log(text);
        return text;
    }
}


exports.convert = async (req, res, next) => {
    let dataBuffer = fs.readFileSync("/Users/blackfish/lexicon-client-app/backend/testPdfs/stroke.pdf");

    pdf(dataBuffer).then(function(pdf){
        return res.status(200).json({ numberOfPages: pdf.numpages,
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

exports.render = async (req, res, next) => {
    const parsingEngine = new ParsingEngine(req.body.path);
    const rendered = parsingEngine.render();

    rendered.then(data => {
        return res.status(200).send(data);
    });
};

exports.test = async (req, res, next) => {
    let dataBuffer = fs.readFileSync("/Users/blackfish/lexicon-client-app/backend/testPdfs/stroke.pdf");



    pdf(dataBuffer).then(function(pdf){
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
}
