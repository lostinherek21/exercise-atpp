import TableBuilder from "./TableBuilder";

export default class PersonDetailTableBuilder {
  public Build() {
    const tableBuilder = new TableBuilder();

    tableBuilder
      .WithDatabase("advanced-ts-chapter3")
      .WithIndexName("personId")
      .WithTableName("People")
      .WithPrimaryField("PersonId")
      .WithVersion(1);

    return tableBuilder;
  }
}
