import { MarkdownDocument, ParseElement, } from "./MarkdownDocument";
import { BuildChainResponsibilityFactory } from "./ResponsibiltyChain";
export default class Markdown {
    toHtml(text) {
        let document = new MarkdownDocument();
        let startChain = new BuildChainResponsibilityFactory().Build(document);
        const lines = text.split(`\n`);
        lines.forEach((line) => {
            const request = new ParseElement();
            request.currentLine = line;
            startChain.handleRequest(request);
        });
        return document;
    }
}
//# sourceMappingURL=index.js.map