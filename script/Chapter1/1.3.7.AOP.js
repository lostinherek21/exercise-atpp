"use strict";
// 假设一个类, 其中的方法是有用户限制的, 有的只能admin执行, 有的是所有人都可以执行
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const currentUser = { user: "zxx", roles: ["user", "guest"] };
function isInRole(role) {
    return currentUser.roles.some((userRole) => role === userRole);
}
class WithRoleCheck {
    AnyoneCanRun(args) {
        console.log("anyone can run");
    }
    UserOnly(args) {
        if (!isInRole("user")) {
            console.log("not allowed user");
            return;
        }
        console.log("user run");
    }
    AdminOnly(args) {
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
function Admin(target, propertyKey, descriptor) {
    //需要装饰的方法
    let originalMethod = descriptor.value;
    //修改其属性value
    descriptor.value = function () {
        if (isInRole('admin')) {
            originalMethod.apply(this, arguments);
            return;
        }
        console.log(`${currentUser.user} is not in admin role`);
    };
    return descriptor;
}
function User(target, propertyKey, descriptor) {
    //需要装饰的方法
    let originalMethod = descriptor.value;
    //修改其属性value
    descriptor.value = function () {
        if (isInRole('user')) {
            originalMethod.apply(this, arguments);
            return;
        }
        console.log(`${currentUser.user} is not in admin role`);
    };
    return descriptor;
}
//装饰一个函数
class WithDecoratorCheck {
    AnyoneCanRun(args) {
        console.log("anyone runs");
    }
    UserOnly(args) {
        console.log("user runs");
    }
    AdminOnly(args) {
        console.log("admin runs");
    }
}
__decorate([
    User
], WithDecoratorCheck.prototype, "UserOnly", null);
__decorate([
    Admin
], WithDecoratorCheck.prototype, "AdminOnly", null);
//测试装饰器
let myChckerA = new WithDecoratorCheck();
myChckerA.AnyoneCanRun("");
myChckerA.UserOnly("");
myChckerA.AdminOnly("");
//expect anyone , user to run , and zxx is not admin role
//使用装饰器工厂的模式
function Role(role) {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function () {
            if (!isInRole(role)) {
                console.log(`${currentUser.user} is not in ${role}`);
                return;
            }
            originalMethod.apply(this, arguments);
        };
        return descriptor;
    };
}
//测试
class WithDecoratorCheckFactory {
    AnyoneCanRun(args) {
        console.log("anyone runs");
    }
    UserOnly(args) {
        console.log("user runs");
    }
    AdminOnly(args) {
        console.log("admin runs");
    }
}
__decorate([
    Role('guest')
], WithDecoratorCheckFactory.prototype, "AnyoneCanRun", null);
__decorate([
    Role('user')
], WithDecoratorCheckFactory.prototype, "UserOnly", null);
__decorate([
    Role('admin')
], WithDecoratorCheckFactory.prototype, "AdminOnly", null);
console.log("-----------------------------B");
const myChckerB = new WithDecoratorCheckFactory();
myChckerB.AnyoneCanRun("");
myChckerB.UserOnly("");
myChckerB.AdminOnly("");
//class decorator :
function ClassRole(role) {
    // 接受一个构造器函数
    return function (constructor) {
        if (!isInRole(role)) {
            throw new Error(`not have access to this class : ${role}`);
        }
    };
}
//# sourceMappingURL=1.3.7.AOP.js.map