// 假设一个类, 其中的方法是有用户限制的, 有的只能admin执行, 有的是所有人都可以执行

const currentUser = <User>{ user: "zxx", roles: ["user", "guest"] };
function isInRole(role: string) {
  return currentUser.roles.some((userRole) => role === userRole);
}

//传统的
interface IDecoratorExample {
  AnyoneCanRun(args: string): void;
  AdminOnly(args: string): void;
  UserOnly(args: string): void;
}
type RoleType = "user" | "admin" | "guest";
interface User {
  user: string;
  roles: RoleType[];
}
class WithRoleCheck implements IDecoratorExample {
  AnyoneCanRun(args: string): void {
    console.log("anyone can run");
  }

  UserOnly(args: string): void {
    if (!isInRole("user")) {
      console.log("not allowed user");
      return;
    }
    console.log("user run");
  }

  AdminOnly(args: string): void {
    if (!isInRole("admin")) {
      console.log("not allowed admin");
      return;
    }
    console.log("admin run");
  }
}

//使用装饰器

//定义一个admin使用的函数装饰器
// target 指向装饰器应用到的元素, propertykey 是装饰器的名字, descriptor 是对象属性描述符
function Admin(target:any,propertyKey:PropertyKey,descriptor:PropertyDescriptor) {
  //需要装饰的方法
  let originalMethod = descriptor.value

  //修改其属性value
  descriptor.value = function() {
    if(isInRole('admin')) {
      originalMethod.apply(this,arguments)
      return
    }
    console.log(`${currentUser.user} is not in admin role`)
  }

  return descriptor
}

function User(target:any,propertyKey:PropertyKey,descriptor:PropertyDescriptor) {
  //需要装饰的方法
  let originalMethod = descriptor.value

  //修改其属性value
  descriptor.value = function() {
    if(isInRole('user')) {
      originalMethod.apply(this,arguments)
      return
    }
    console.log(`${currentUser.user} is not in admin role`)
  }

  return descriptor
}

//装饰一个函数
class WithDecoratorCheck implements IDecoratorExample {
  AnyoneCanRun(args: string): void {
    console.log("anyone runs")
  }

  @User
  UserOnly(args: string): void {
    console.log("user runs")
  }

  @Admin
  AdminOnly(args: string): void {
    console.log("admin runs")
  }
}

//测试装饰器
let myChckerA = new WithDecoratorCheck()
myChckerA.AnyoneCanRun("")
myChckerA.UserOnly("")
myChckerA.AdminOnly("")

//expect anyone , user to run , and zxx is not admin role

//使用装饰器工厂的模式
function Role(role:RoleType) {
  return function (target:any,key:PropertyKey,descriptor:PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function () {
      if(!isInRole(role)) {
        console.log(`${currentUser.user} is not in ${role}`)
        return
      }
      originalMethod.apply(this,arguments)
    }

    return descriptor
  }
}

//测试
class WithDecoratorCheckFactory implements IDecoratorExample {
  @Role('guest')
  AnyoneCanRun(args: string): void {
    console.log("anyone runs")
  }

  @Role('user')
  UserOnly(args: string): void {
    console.log("user runs")
  }

  @Role('admin')
  AdminOnly(args: string): void {
    console.log("admin runs")
  }
}

console.log("-----------------------------B")
const myChckerB = new WithDecoratorCheckFactory()
myChckerB.AnyoneCanRun("")
myChckerB.UserOnly("")
myChckerB.AdminOnly("")

//class decorator :
function ClassRole(role:string) {
  // 接受一个构造器函数
  return function (constructor: Function) {
    if(!isInRole(role)){
      throw new Error(`not have access to this class : ${role}`)
    }
  }
}