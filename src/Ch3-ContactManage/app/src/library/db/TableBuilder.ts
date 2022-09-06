import { ITable, ITableBuilder } from "../../Types/Table";

export default class TableBuilder implements ITableBuilder, ITable {
  private database: string = "";
  private version: number = 0;
  private primaryField: string = "";
  private indexName: string = "";
  private tableName: string = "";

  WithDatabase(database:string) :ITableBuilder {
    this.database = database
    return this
  }

  WithIndexName(indexName: string): ITableBuilder {
    this.indexName = indexName
    return this
  }

  WithPrimaryField(primaryField: string): ITableBuilder {
    this.primaryField = primaryField
    return this
  }

  WithTableName(tableName: string): ITableBuilder {
    this.tableName = tableName
    return this
  }

  WithVersion(version: number): ITableBuilder {
    this.version = version
    return this
  }

  Version(): number {
    return this.version
  }

  Database(): string {
    return this.database
  }

  IndexName(): string {
    return this.indexName
  }

  TableName(): string {
    return this.tableName
  }

  Build(database: IDBDatabase): void {
    const parameters: IDBObjectStoreParameters = {keyPath: this.primaryField}
    const objectStore = database.createObjectStore(this.tableName,parameters)
    objectStore.createIndex(this.indexName,this.primaryField)
  }
}
