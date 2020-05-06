//

function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
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
      // console.log("get", key, val);
      return val;
    },
    set(newVal) {
      // 写拦截
      if (newVal !== val) {
        // 如果val本身是对象，还是需要做响应式处理
        observe(newVal);
        // console.log("set", key, newVal);
        val = newVal;
      }
    },
  });
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

function proxy(vm, prop) {
  Object.keys(vm[prop]).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[prop][key];
      },
      set(newVal) {
        vm[prop][key] = newVal;
      },
    });
  });
}

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 1、响应式处理
    observe(this.$data);
    // 1.1 数据代理
    proxy(this, "$data");

    // 2、模板编译
    new Complie(options.el, this);
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

// 编译器：解析模板中的插值表达式或者指令
class Complie {
  // vm是KVue的实例，用于初始化和更新页面
  // el是一个选择器，可以获取模板的dom
  constructor(el, vm) {
    this.$vm = vm;
    // 获取模板
    this.$el = document.querySelector(el);

    this.compile(this.$el);
  }

  compile(el) {
    const childNodes = el.childNodes;

    // 遍历所有子节点
    Array.from(childNodes).forEach((node) => {
      // 元素类型
      if (this.isElement(node)) {
        // console.log('编译元素',node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // console.log('编译插值文本',node.textContent);
        this.compileText(node);
      }

      // 递归
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  isElement(node) {
    // 1 元素 3 文本
    return node.nodeType === 1;
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 编译插值文本，初始化
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1];
  }

  // 编译元素节点：判断他的属性是否是k-xx，@xx
  compileElement(node) {
    // 获取属性
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach((attr) => {
      // attr对象{name:'k-text',value:'counter}
      let attrName = attr.name;
      let exp = attr.value;
      // 如果是指令，
      if (this.isDir(attrName)) {
        // 获取指令处理函数并执行
        let dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }
    });
  }

  isDir(attr) {
    return attr.indexOf("k-") === 0;
  }

  // k-text指令执行
  text(node, exp) {
    node.textContent = this.$vm[exp];
  }
}
