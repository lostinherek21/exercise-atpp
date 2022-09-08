"use strict";
//一个队列, 需要处理数字或者字符串, 或者其他类型的的类
class Queue {
    constructor() {
        this.queue = Array();
    }
    push(item) {
        this.queue.push(item);
    }
    shift() {
        return this.queue.shift();
    }
}
class Data {
    ReadStream(data) {
        return data.ReadStream();
    }
}
class WebStream {
    ReadStream() {
        let array = new Int8Array();
        return array;
    }
}
class DiskStream {
    ReadStream() {
        let array = new Int8Array();
        return array;
    }
}
let d = new Data();
let byteArr = d.ReadStream(new DiskStream());
//# sourceMappingURL=1.3.9.Generic.js.map