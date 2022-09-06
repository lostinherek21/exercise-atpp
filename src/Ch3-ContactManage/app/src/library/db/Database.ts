import { IRecordState, PersonRecordState } from "../../Types/PersonRecordState";
import PersonDetailTableBuilder from "./PersonDetailTableBuilder";
import { ITable } from "./../../Types/Table";

export default class DataBase<T extends IRecordState> {
  private database: IDBDatabase | null
  private readonly indexDB: IDBFactory

  constructor(private table: ITable) {
    this.database = null
    this.indexDB = window.indexedDB
    this.openDatabase();
  }

  private openDatabase() {
    const open = this.indexDB.open(
      this.table.TableName(),
      this.table.Version()
    );

    open.onupgradeneeded = (e: any) => {
      this.UpgradeDatabase(e.target.result);
    };

    open.onsuccess = (e: any) => {
      this.database = e.target.result;
    };
  }

  private UpgradeDatabase(database: IDBDatabase) {
    this.database = database;
    this.table.Build(database);
  }

  private GetObjectStore(): IDBObjectStore | undefined {
    try {
      const transaction: IDBTransaction | undefined =
        this.database?.transaction(this.table.TableName(), "readwrite");

      const dbStore = transaction?.objectStore(this.table.TableName());
      return dbStore;
    } catch (error) {
      console.log(error);
    }

    return undefined;
  }

  public Create(state: T) {
    const dbStore = this.GetObjectStore();
    dbStore?.add(state);
  }

  public ReadCb(callback: (state: T[]) => void): void {
    const items: T[] = [];

    const dbStore = this.GetObjectStore();
    const request: IDBRequest | undefined = dbStore?.openCursor();
    if (request) {
      request.onsuccess = (e: any) => {
        const cursor: IDBCursorWithValue = e.target.result;
        if (cursor) {
          const result: T = cursor.value;
          if (result.isActive) {
            items.push(result);
          }
          cursor.continue();
        } else {
          callback(items);
        }
      };
    }
  }

  public Read(): Promise<T[]> {
    return new Promise<T[]>((resolve) => {
      const items: T[] = [];

      const dbStore = this.GetObjectStore();
      const requst: IDBRequest | undefined = dbStore?.openCursor();
      if (requst) {
        requst.onsuccess = (e: any) => {
          const cursor: IDBCursorWithValue = e.target.result;
          if (cursor) {
            const result: T = cursor.value;
            if (result.isActive) {
              items.push(result);
            }
            cursor.continue();
          } else {
            resolve(items);
          }
        };
      }
    });
  }

  public Update(state: T): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.GetObjectStore();
      const request = dbStore?.put(state);
      if (request) {
        request.onsuccess = (e: any) => {
          resolve();
        };
      }
    });
  }

  public Delete(index: string | number): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.GetObjectStore()
      const request = dbStore?.delete(index.toString())
      if(request) {
        request.onsuccess = (e:any) => {
          resolve()
        }
      }
    });
  }
}
