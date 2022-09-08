import Markdown from "./../Markdown/index";
export default class HtmlHandler {
    constructor() {
        this.markdown = new Markdown();
    }
    HandleTextChange(inputId, outputId) {
        const markdown = document.getElementById(inputId);
        const markdownOuput = document.getElementById(outputId);
        if (!markdown || !markdownOuput)
            return;
        markdown.onkeyup = (e) => {
            this.renderHtml(markdown, markdownOuput);
        };
    }
    renderHtml(markdown, output) {
        if (markdown.value) {
            output.innerHTML = this.markdown.toHtml(markdown.value).getDocuments();
        }
        else {
            output.innerHTML = "<p></p>";
        }
    }
}
//# sourceMappingURL=index.js.map