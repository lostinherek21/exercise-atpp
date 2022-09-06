export interface ITable {
  Database():string
  Version():number
  TableName():string
  IndexName():string
  Build(database:IDBDatabase):void
}

export interface ITableBuilder {
  WithDatabase(database:string):ITableBuilder
  WithVersion(version:number):ITableBuilder
  WithTableName(tableName:string):ITableBuilder
  WithIndexName(indexName:string):ITableBuilder
  WithPrimaryField(primaryField:string):ITableBuilder
}
