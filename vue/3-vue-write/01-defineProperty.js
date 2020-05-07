//数组响应式
// 1、替换数组原型中的7个方法
const originalProto = Array.prototype;
// 备份，修改备份
const arrayProto = Object.create(originalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function () {
    // 原始操作
    arrayProto[method].apply(this, arguments);
    // 覆盖：通知更新
    console.log("数组执行" + method + "操作：");
  };
});

// Object.defineProperty()

function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部元素执行响应化
    const keys = Object.keys(obj);
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
function defineReactive(obj, key, val) {
  //递归遍历，如果val本身是对象
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      // 读拦截
      console.log("get", key, val);
      return val;
    },
    set(newVal) {
      // 写拦截
      if (newVal !== val) {
        // 如果val本身是对象，还是需要做响应式处理
        observe(newVal);
        console.log("set", key, newVal);
        val = newVal;
      }
    },
  });
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 } };
observe(obj);
// defineReactive(obj,'foo','foo')

// obj.foo
// obj.foo = 'foooooo'
// obj.bar
// obj.bar='barrrrrrr'
// obj.baz.a
// obj.baz.a = 10
// obj.baz={a:10}
set(obj, "dong", "dong");
obj.dong = "dong";
obj.dong;
