const fs = require("fs");
const path = require('path');
const pdf = require('pdf-parse');

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
    // console.log('convert');
    let dataBuffer = fs.readFileSync('/Users/blackfish/lexicon-client-app/backend/testPdfs/test.pdf');

    pdf(dataBuffer).then(function(pdf){
        return res.status(200).json({ numberOfPages: pdf.numpages,
                                      text: pdf.text,
                                      metadata: pdf.metapdf
                                    });
    });
};

exports.render = async (req, res, next) => {
    const parsingEngine = new ParsingEngine("/Users/blackfish/lexicon-client-app/backend/testPdfs/test.pdf");

    const rendered = parsingEngine.render();
    rendered.then(data => {
        console.log(data);
        return res.status(200).send(data);
    });

};
