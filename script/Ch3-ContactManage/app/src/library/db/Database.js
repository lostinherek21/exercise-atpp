export default class DataBase {
    constructor(table) {
        this.table = table;
        this.database = null;
        this.indexDB = window.indexedDB;
        this.openDatabase();
    }
    openDatabase() {
        const open = this.indexDB.open(this.table.TableName(), this.table.Version());
        open.onupgradeneeded = (e) => {
            this.UpgradeDatabase(e.target.result);
        };
        open.onsuccess = (e) => {
            this.database = e.target.result;
        };
    }
    UpgradeDatabase(database) {
        this.database = database;
        this.table.Build(database);
    }
    GetObjectStore() {
        var _a;
        try {
            const transaction = (_a = this.database) === null || _a === void 0 ? void 0 : _a.transaction(this.table.TableName(), "readwrite");
            const dbStore = transaction === null || transaction === void 0 ? void 0 : transaction.objectStore(this.table.TableName());
            return dbStore;
        }
        catch (error) {
            console.log(error);
        }
        return undefined;
    }
    Create(state) {
        const dbStore = this.GetObjectStore();
        dbStore === null || dbStore === void 0 ? void 0 : dbStore.add(state);
    }
    ReadCb(callback) {
        const items = [];
        const dbStore = this.GetObjectStore();
        const request = dbStore === null || dbStore === void 0 ? void 0 : dbStore.openCursor();
        if (request) {
            request.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor) {
                    const result = cursor.value;
                    if (result.isActive) {
                        items.push(result);
                    }
                    cursor.continue();
                }
                else {
                    callback(items);
                }
            };
        }
    }
    Read() {
        return new Promise((resolve) => {
            const items = [];
            const dbStore = this.GetObjectStore();
            const requst = dbStore === null || dbStore === void 0 ? void 0 : dbStore.openCursor();
            if (requst) {
                requst.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                        const result = cursor.value;
                        if (result.isActive) {
                            items.push(result);
                        }
                        cursor.continue();
                    }
                    else {
                        resolve(items);
                    }
                };
            }
        });
    }
    Update(state) {
        return new Promise((resolve) => {
            const dbStore = this.GetObjectStore();
            const request = dbStore === null || dbStore === void 0 ? void 0 : dbStore.put(state);
            if (request) {
                request.onsuccess = (e) => {
                    resolve();
                };
            }
        });
    }
    Delete(index) {
        return new Promise((resolve) => {
            const dbStore = this.GetObjectStore();
            const request = dbStore === null || dbStore === void 0 ? void 0 : dbStore.delete(index.toString());
            if (request) {
                request.onsuccess = (e) => {
                    resolve();
                };
            }
        });
    }
}
//# sourceMappingURL=Database.js.map