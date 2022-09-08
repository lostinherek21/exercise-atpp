export class MarkdownDocument {
    constructor() {
        this.documents = "";
    }
    add(...contents) {
        contents.forEach(content => this.documents += content);
    }
    getDocuments() {
        return this.documents;
    }
}
export class ParseElement {
    constructor() {
        this.currentLine = "";
    }
}
//# sourceMappingURL=MarkdownDocument.js.map