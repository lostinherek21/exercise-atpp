import { IMarkdownDocument, ParseElement } from "./MarkdownDocument";
import TagTypeToHtml, { TagType } from "./TagTypeToHtml";

export interface IVisitor {
  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
export interface IVisitable {
  accept(
    visitor: IVisitor,
    token: ParseElement,
    markdownDocument: IMarkdownDocument
  ): void;
}

abstract class VisitorBase implements IVisitor {
  private readonly tagToHtml: TagTypeToHtml = new TagTypeToHtml()
  constructor(
    private readonly tagType: TagType,
  ) {}

  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
    markdownDocument.add(
      this.tagToHtml.OpeningTag(this.tagType),
      token.currentLine,
      this.tagToHtml.ClosingTag(this.tagType)
    );
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


export class Visitable implements IVisitable {
  accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void {
    visitor.visit(token,markdownDocument)
  }
}