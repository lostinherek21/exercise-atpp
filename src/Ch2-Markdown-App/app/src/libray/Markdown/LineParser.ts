import TagTypeToHtml, { TagType } from "./TagTypeToHtml";

export default class LineParser {
  private readonly tagToHtml = new TagTypeToHtml();
  public parse(content: string, tagType: TagType): [boolean, string] {
    if (!content) return [false, content];

    const tag = this.tagToHtml.getMatchTag(tagType);
    const isFindTag = content.startsWith(tag);
    if (isFindTag) return [true, content.slice(tag.length)];

    return [false, content];
  }
}
