import { MarkdownDocument, ParseElement } from "./MarkdownDocument";
import { TagType } from "./TagTypeToHtml";
import {
  Header1Visitor,
  Header2Visitor,
  Header3Visitor,
  HorizentalLineVisitor,
  IVisitor,
  ParagraphVisitor,
  Visitable,
} from "./TagVisitor";
import LineParser from "./LineParser";

export abstract class Handler<T> {
  protected next: Handler<T> | null = null;
  protected abstract canHandle(request: T): boolean;
  public setNext(n: Handler<T>) {
    this.next = n;
  }

  public handleRequest(request: T): void {
    if (!this.canHandle(request)) {
      if (this.next) {
        this.next.handleRequest(request);
      }
      return;
    }
  }
}

export class ParseChainHandler extends Handler<ParseElement> {
  private readonly lineParser: LineParser = new LineParser();
  private readonly visitable: Visitable = new Visitable();
  constructor(
    private readonly visitor: IVisitor,
    private readonly tagType: TagType,
    private mdDocument: MarkdownDocument
  ) {
    super();
  }

  protected canHandle(request: ParseElement): boolean {
    const [isMatch, content] = this.lineParser.parse(
      request.currentLine,
      this.tagType
    );

    if (isMatch) {
      request.currentLine = content;
      this.visitable.accept(this.visitor, request, this.mdDocument);
    }

    return isMatch;
  }
}

export class ParagraphChainHandler extends Handler<ParseElement> {
  private readonly visitable: Visitable = new Visitable();
  private readonly visitor: IVisitor = new ParagraphVisitor();
  constructor(private readonly mdDocument: MarkdownDocument) {
    super();
  }

  protected canHandle(request: ParseElement): boolean {
    this.visitable.accept(this.visitor, request, this.mdDocument);
    return true;
  }
}

export class Header1ChainHandler extends ParseChainHandler {
  constructor(d: MarkdownDocument) {
    super(new Header1Visitor(), TagType.Header1, d);
  }
}
export class Header2ChainHandler extends ParseChainHandler {
  constructor(d: MarkdownDocument) {
    super(new Header2Visitor(), TagType.Header2, d);
  }
}
export class Header3ChainHandler extends ParseChainHandler {
  constructor(d: MarkdownDocument) {
    super(new Header3Visitor(), TagType.Header3, d);
  }
}

export class HorizentalLineChainHandler extends ParseChainHandler {
  constructor(d: MarkdownDocument) {
    super(new HorizentalLineVisitor(), TagType.HorizontalLine, d);
  }
}

export class BuildChainResponsibilityFactory {
  Build(mdDocument: MarkdownDocument): ParseChainHandler {
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
