import Markdown from "./../Markdown/index";
export default class HtmlHandler {
  private markdown: Markdown = new Markdown();
  public HandleTextChange(inputId: string, outputId: string) {
    const markdown = document.getElementById(inputId) as HTMLTextAreaElement | null;
    const markdownOuput = document.getElementById(outputId) as HTMLDivElement | null;

    if (!markdown || !markdownOuput) return;

    markdown.onkeyup = (e) => {
      this.renderHtml(markdown,markdownOuput)
    };
  }

  private renderHtml(markdown: HTMLTextAreaElement, output: HTMLDivElement) {
    if (markdown.value) {
      output.innerHTML = this.markdown.toHtml(markdown.value).getDocuments();
    } else {
      output.innerHTML = "<p></p>";
    }
  }
}
