//一个队列, 需要处理数字或者字符串, 或者其他类型的的类

class Queue<T> {
  private queue = Array<T>();

  public push(item: T) {
    this.queue.push(item);
  }
  public shift(): T | undefined {
    return this.queue.shift();
  }
}

//类型约束
//假设有一个Data 类型, 需要处理不同类型的stream 读写
interface IStream {
  ReadStream(): Int8Array;
}

class Data<T extends IStream> {
  ReadStream(data: T) {
    return data.ReadStream();
  }
}

class WebStream implements IStream {
  ReadStream(): Int8Array {
    let array: Int8Array = new Int8Array();
    return array;
  }
}

class DiskStream implements IStream {
  ReadStream(): Int8Array {
    let array: Int8Array = new Int8Array();
    return array;
  }
}

let d = new Data<DiskStream>()
let byteArr = d.ReadStream(new DiskStream())