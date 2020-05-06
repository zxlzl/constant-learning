//

function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return
  }

  // 创建Observer的实例
  // 每遍历一个对象属性就创建一个Ob实例
  new Observer(obj);
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

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 1、响应式处理
    observe(this.$data);

    // 2、模板编译
  }
}

// 分辨响应式数据对象是对象还是数组
class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
