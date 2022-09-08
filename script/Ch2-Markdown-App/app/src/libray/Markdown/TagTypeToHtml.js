export var TagType;
(function (TagType) {
    TagType[TagType["Paragraph"] = 0] = "Paragraph";
    TagType[TagType["Header1"] = 1] = "Header1";
    TagType[TagType["Header2"] = 2] = "Header2";
    TagType[TagType["Header3"] = 3] = "Header3";
    TagType[TagType["HorizontalLine"] = 4] = "HorizontalLine";
})(TagType || (TagType = {}));
export default class TagTypeToHtml {
    constructor() {
        this.tagMap = new Map();
        this.tagMatchMap = new Map();
        this.tagMap.set(TagType.Header1, "h1");
        this.tagMap.set(TagType.Header2, "h2");
        this.tagMap.set(TagType.Header3, "h3");
        this.tagMap.set(TagType.Paragraph, "p");
        this.tagMap.set(TagType.HorizontalLine, "hr");
        this.tagMatchMap.set(TagType.Header1, "# ");
        this.tagMatchMap.set(TagType.Header2, "## ");
        this.tagMatchMap.set(TagType.Header3, "### ");
        this.tagMatchMap.set(TagType.HorizontalLine, "---");
    }
    getMatchTag(type) {
        return this.tagMatchMap.get(type);
    }
    OpeningTag(type) {
        return this.getTag(type, "<");
    }
    ClosingTag(type) {
        return this.getTag(type, "</");
    }
    getTag(type, tagOpenPattern) {
        return `${tagOpenPattern}${this.tagMap.get(type)}>`;
    }
}
//# sourceMappingURL=TagTypeToHtml.js.map