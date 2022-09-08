export default class TableBuilder {
    constructor() {
        this.database = "";
        this.version = 0;
        this.primaryField = "";
        this.indexName = "";
        this.tableName = "";
    }
    WithDatabase(database) {
        this.database = database;
        return this;
    }
    WithIndexName(indexName) {
        this.indexName = indexName;
        return this;
    }
    WithPrimaryField(primaryField) {
        this.primaryField = primaryField;
        return this;
    }
    WithTableName(tableName) {
        this.tableName = tableName;
        return this;
    }
    WithVersion(version) {
        this.version = version;
        return this;
    }
    Version() {
        return this.version;
    }
    Database() {
        return this.database;
    }
    IndexName() {
        return this.indexName;
    }
    TableName() {
        return this.tableName;
    }
    Build(database) {
        const parameters = { keyPath: this.primaryField };
        const objectStore = database.createObjectStore(this.tableName, parameters);
        objectStore.createIndex(this.indexName, this.primaryField);
    }
}
//# sourceMappingURL=TableBuilder.js.map