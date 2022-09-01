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
  constructor(
    private readonly tagType: TagType,
    private readonly tagToHtlm: TagTypeToHtml
  ) {}

  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
    markdownDocument.add(
      this.tagToHtlm.OpeningTag(this.tagType),
      token.currentLine,
      this.tagToHtlm.ClosingTag(this.tagType)
    );
  }
}

export class Header1Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header1, new TagTypeToHtml());
  }
}
export class Header2Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header2, new TagTypeToHtml());
  }
}
export class Header3Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header3, new TagTypeToHtml());
  }
}
export class ParagraphVisitor extends VisitorBase {
  constructor() {
    super(TagType.Paragraph, new TagTypeToHtml());
  }
}
export class HorizentalLineVisitor extends VisitorBase {
  constructor() {
    super(TagType.HorizontalLine, new TagTypeToHtml());
  }
}


export class Visitable implements IVisitable {
  accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void {
    visitor.visit(token,markdownDocument)
  }
}