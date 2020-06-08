// 方法装饰器
function Methods(target, property, descriptor) {
  console.log("====================================");
  console.log("property");
  console.log(property);
  console.log("====================================");
  console.log("====================================");
  console.log("target");
  console.log(target);
  console.log("====================================");
  console.log("====================================");
  console.log("descriptor");
  console.log(descriptor);
  console.log("====================================");
}

// 类装饰器
function Class(target) {
  console.log("====================================");
  console.log("target");
  console.log(target);
  console.log("====================================");
}

// @Class
class Example {
  // @Methods
  instanceMember() {}

  static staticMember() {}
}

const example = new Example();
console.log(example);


// // 类装饰器
function anotationClass(id) {
  console.log(id);
  return (target) => {
    console.log("target 类的构造函数:", target);
    console.log("anotationClass executed", id);
  };
}

// 方法装饰器
function anotationMethods(id){
    console.log('anotationMethods evaluated', id);
    return (target, property, descriptor) => {
        // target 代表

        // process.nextTick((() => {
            target.abc = 123
            console.log('method target',target)
        // }))
        console.log('anotationMethods executed', id);

    }
}


