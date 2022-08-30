//假设一个记录管理的类, 保存人员记录, 后续业务需要新增记录的事件和是否已删除标志

//传统的继承
class ActiveRecord {
  Deleted = false;
}
//class 继承 从而获得记录是否删除的功能
class Person extends ActiveRecord {
  constructor(private firstName: string, private lastName: string) {
    super();
  }
}

//混入的思想
//定义是类类型
type Constructor<T = {}> = new (...args: any[]) => T;
//通过class的继承混入
function RecordStatus<T extends Constructor>(base: T) {
  return class RecordStatus extends base {
    deleted = false;
  };
}

const ActivePersonRecord = RecordStatus(Person);

//example
type Pos = { x: number; y: number };

class BaseObject implements BaseObject {
  width = 0;
  height = 0;
  pos = { x: 0, y: 0 };
}

interface MovementAble {
  lastPos: Pos;

  setPos(p: Pos): void;
}
function mixinMovement<T extends Constructor<BaseObject>>(
  base: T
): Constructor<MovementAble> & T {
  return class extends base implements MovementAble {
    lastPos = { x: 0, y: 0 };

    setPos(p: Pos) {
      this.lastPos = this.pos;
      this.pos = p;
    }
  };
}

const MoveableObject = mixinMovement(BaseObject);
const aMoveingObject = new MoveableObject();

interface Jumpable {
  jump(): void;
}

type JumpableCtor = Constructor<MovementAble & BaseObject>;

function mixinJumpable<T extends JumpableCtor>(base: T): JumpableCtor & T {
  return class extends base {
    private _jumpHeight = 20;

    jump() {
      this.setPos({ x: this.lastPos.x, y: this.pos.y + this._jumpHeight });
    }

    get jumpHeight() {
      return this._jumpHeight;
    }
    setJumpHeight(height: number) {
      this._jumpHeight = height;
    }
  };
}

const JumpMoveableObject = mixinJumpable(mixinMovement(BaseObject));

class Box extends JumpMoveableObject {
  width = 0;
  height = 0;
  pos = { x: 0, y: 0 };
}

type MoveJumpableBox = BaseObject & MovementAble & Jumpable;

const aBox = new Box() as MoveJumpableBox;
console.log(aBox.jump(), aBox.jump());
console.log(aBox);

//example 2
