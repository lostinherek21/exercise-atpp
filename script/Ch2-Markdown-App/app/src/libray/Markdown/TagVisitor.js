import TagTypeToHtml, { TagType } from "./TagTypeToHtml";
class VisitorBase {
    constructor(tagType) {
        this.tagType = tagType;
        this.tagToHtml = new TagTypeToHtml();
    }
    visit(token, markdownDocument) {
        markdownDocument.add(this.tagToHtml.OpeningTag(this.tagType), token.currentLine, this.tagToHtml.ClosingTag(this.tagType));
    }
}
export class Header1Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header1);
    }
}
export class Header2Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header2);
    }
}
export class Header3Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header3);
    }
}
export class ParagraphVisitor extends VisitorBase {
    constructor() {
        super(TagType.Paragraph);
    }
}
export class HorizentalLineVisitor extends VisitorBase {
    constructor() {
        super(TagType.HorizontalLine);
    }
}
export class Visitable {
    accept(visitor, token, markdownDocument) {
        visitor.visit(token, markdownDocument);
    }
}
//# sourceMappingURL=TagVisitor.js.map