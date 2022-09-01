export enum TagType {
  Paragraph,
  Header1,
  Header2,
  Header3,
  HorizontalLine,
}

export default class TagTypeToHtml {
  private readonly tagMap = new Map<TagType, string>();
  private readonly tagMatchMap = new Map<TagType,string>()
  constructor() {
    this.tagMap.set(TagType.Header1, "h1");
    this.tagMap.set(TagType.Header2, "h2");
    this.tagMap.set(TagType.Header3, "h3");
    this.tagMap.set(TagType.Paragraph, "p");
    this.tagMap.set(TagType.HorizontalLine, "hr");

    this.tagMatchMap.set(TagType.Header1,"# ")
    this.tagMatchMap.set(TagType.Header2,"## ")
    this.tagMatchMap.set(TagType.Header3,"### ")
    this.tagMatchMap.set(TagType.HorizontalLine,"---")
  }

  public getMatchTag(type: TagType): string {
    return this.tagMatchMap.get(type) as string;
  }

  public OpeningTag(type: TagType): string {
    return this.getTag(type, "<");
  }

  public ClosingTag(type: TagType): string {
    return this.getTag(type, "</");
  }

  private getTag(type: TagType, tagOpenPattern: string): string {
    return `${tagOpenPattern}${this.tagMap.get(type)}>`;
  }
}
