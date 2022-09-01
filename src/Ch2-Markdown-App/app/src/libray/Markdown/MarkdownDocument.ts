export interface IMarkdownDocument {
  add(...contents:string[]): void
  getDocuments(): string
}

export class MarkdownDocument implements IMarkdownDocument{
  private documents:string = ""
  add(...contents: string[]): void {
    contents.forEach(content => this.documents += content)
  }
  getDocuments(): string {
    return this.documents
  }
}

export class ParseElement {
  currentLine = ""
}