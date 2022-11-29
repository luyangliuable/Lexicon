const fs = require("fs");
const path = require('path');
const pdf = require('pdf-parse');

class Parser {
    constructor(pdflocation) {
        this.pdflocation = pdflocation;
        this.rawdata = fs.readFileSync(pdflocation);
        this.pdf = pdf(this.rawdata);
    }

    async getPDFName() {
        const pdf = await this.pdf;
        const text = pdf.text;
        return text.split("\n")[2];
    }

    get pdfLocation() {
        return this.pdflocation;
    }

    async render() {
        const pdf = await this.pdf;
        var text = pdf.text;
        text = text.replace(/\n/g, "<br /> ");
        return text;
    }
}

module.exports = Parser;
