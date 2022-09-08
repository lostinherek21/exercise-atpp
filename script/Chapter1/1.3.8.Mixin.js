"use strict";
//假设一个记录管理的类, 保存人员记录, 后续业务需要新增记录的事件和是否已删除标志
//传统的继承
class ActiveRecord {
    constructor() {
        this.Deleted = false;
    }
}
//class 继承 从而获得记录是否删除的功能
class Person extends ActiveRecord {
    constructor(firstName, lastName) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
//通过class的继承混入
function RecordStatus(base) {
    return class RecordStatus extends base {
        constructor() {
            super(...arguments);
            this.deleted = false;
        }
    };
}
const ActivePersonRecord = RecordStatus(Person);
class BaseObject {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.pos = { x: 0, y: 0 };
    }
}
function mixinMovement(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.lastPos = { x: 0, y: 0 };
        }
        setPos(p) {
            this.lastPos = this.pos;
            this.pos = p;
        }
    };
}
const MoveableObject = mixinMovement(BaseObject);
const aMoveingObject = new MoveableObject();
function mixinJumpable(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this._jumpHeight = 20;
        }
        jump() {
            this.setPos({ x: this.lastPos.x, y: this.pos.y + this._jumpHeight });
        }
        get jumpHeight() {
            return this._jumpHeight;
        }
        setJumpHeight(height) {
            this._jumpHeight = height;
        }
    };
}
const JumpMoveableObject = mixinJumpable(mixinMovement(BaseObject));
class Box extends JumpMoveableObject {
    constructor() {
        super(...arguments);
        this.width = 0;
        this.height = 0;
        this.pos = { x: 0, y: 0 };
    }
}
const aBox = new Box();
console.log(aBox.jump(), aBox.jump());
console.log(aBox);
//example 2
//# sourceMappingURL=1.3.8.Mixin.js.map