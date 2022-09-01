
import { IMarkdownDocument, MarkdownDocument, ParseElement } from './MarkdownDocument';
import { BuildChainResponsibilityFactory } from './ResponsibiltyChain';

export default class Markdown {
  public toHtml(text:string) {
    let document = new MarkdownDocument()
    let startChain =new BuildChainResponsibilityFactory().Build(document)

    const lines = text.split(`\n`)
    lines.forEach((line) => {
      const request = new ParseElement()
      request.currentLine = line
      startChain.handleRequest(request)
    })

    return document
  }
}