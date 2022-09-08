import TagTypeToHtml from "./TagTypeToHtml";
export default class LineParser {
    constructor() {
        this.tagToHtml = new TagTypeToHtml();
    }
    parse(content, tagType) {
        if (!content)
            return [false, content];
        const tag = this.tagToHtml.getMatchTag(tagType);
        const isFindTag = content.startsWith(tag);
        if (isFindTag)
            return [true, content.slice(tag.length)];
        return [false, content];
    }
}
//# sourceMappingURL=LineParser.js.map