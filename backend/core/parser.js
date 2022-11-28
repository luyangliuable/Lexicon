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
