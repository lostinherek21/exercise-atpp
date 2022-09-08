import { TagType } from "./TagTypeToHtml";
import { Header1Visitor, Header2Visitor, Header3Visitor, HorizentalLineVisitor, ParagraphVisitor, Visitable, } from "./TagVisitor";
import LineParser from "./LineParser";
export class Handler {
    constructor() {
        this.next = null;
    }
    setNext(n) {
        this.next = n;
    }
    handleRequest(request) {
        if (!this.canHandle(request) && this.next) {
            this.next.handleRequest(request);
        }
    }
}
export class ParseChainHandler extends Handler {
    constructor(visitor, tagType, mdDocument) {
        super();
        this.visitor = visitor;
        this.tagType = tagType;
        this.mdDocument = mdDocument;
        this.lineParser = new LineParser();
        this.visitable = new Visitable();
    }
    canHandle(request) {
        const [isMatch, content] = this.lineParser.parse(request.currentLine, this.tagType);
        if (isMatch) {
            request.currentLine = content;
            this.visitable.accept(this.visitor, request, this.mdDocument);
        }
        return isMatch;
    }
}
export class ParagraphChainHandler extends Handler {
    constructor(mdDocument) {
        super();
        this.mdDocument = mdDocument;
        this.visitable = new Visitable();
        this.visitor = new ParagraphVisitor();
    }
    canHandle(request) {
        this.visitable.accept(this.visitor, request, this.mdDocument);
        return true;
    }
}
export class Header1ChainHandler extends ParseChainHandler {
    constructor(d) {
        super(new Header1Visitor(), TagType.Header1, d);
    }
}
export class Header2ChainHandler extends ParseChainHandler {
    constructor(d) {
        super(new Header2Visitor(), TagType.Header2, d);
    }
}
export class Header3ChainHandler extends ParseChainHandler {
    constructor(d) {
        super(new Header3Visitor(), TagType.Header3, d);
    }
}
export class HorizentalLineChainHandler extends ParseChainHandler {
    constructor(d) {
        super(new HorizentalLineVisitor(), TagType.HorizontalLine, d);
    }
}
export class BuildChainResponsibilityFactory {
    Build(mdDocument) {
        const header1 = new Header1ChainHandler(mdDocument);
        const header2 = new Header2ChainHandler(mdDocument);
        const header3 = new Header3ChainHandler(mdDocument);
        const horizentalLine = new HorizentalLineChainHandler(mdDocument);
        const paragraphy = new ParagraphChainHandler(mdDocument);
        header1.setNext(header2);
        header2.setNext(header3);
        header3.setNext(horizentalLine);
        horizentalLine.setNext(paragraphy);
        return header1;
    }
}
//# sourceMappingURL=ResponsibiltyChain.js.map