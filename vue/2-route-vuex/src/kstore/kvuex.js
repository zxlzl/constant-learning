// 实现一个插件：实现store类，挂载$store
// 引用Vue的构造函数

let Vue;

class Store {
  constructor(options) {
    // 保存mutations
    this._mutations = options.mutations;

    this._actions = options.actions;

    this._wrappedGetters = options.getters;
    // 定义computed选项
    const computed = {};
    this.getters = {};
    const store = this;
    Object.keys(this._wrappedGetters).forEach((key) => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key];
      // 转换为computed可以使用的无参数形式
      computed[key]=function(){
        return fn(store.state)
      }
      // 为getters定义只读属性
      Object.defineProperty(store.getters,key,{
        get:()=>store._vm[key]
      })
    });

    // 只要放到data上，即成为响应式数据
    // vm.data.xx vm.count
    this._vm = new Vue({
      data: {
        count: 0,
        $$state: options.state,
      },
      computed
    });

    // 绑定commit、dispatch方法中的this到Store实例
    // const store = this;
    const { commit, dispatch } = store;
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload);
    };
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload);
    };
  }

  // 只读state可以获取数据
  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("表改，这里不能修改state，想改请使用replaceState()");
  }

  // commit: type-mutation类型，payload-参数
  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error("unknow type：" + type);
      return;
    }
    // 在这里可以做一些拦截处理
    // 传递state进去
    entry(this.state, payload);
  }

  // dispatch: type-actions类型，payload-参数
  dispatch(type, payload) {
    const entry = this._actions[type];
    if (!entry) {
      console.error("unknow type：" + type);
      return;
    }
    // 在这里可以做一些拦截处理
    // 传递上下文进去，实际上下文就是Store实例
    entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;
  //全局混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 下面导出的类对象等同于vuex，实例化时使用new Vuex.store
export default { Store, install };
