import Link from "./krouter-link";
import View from "./krouter-view";

// 1、实现一个插件：挂载$router，声明两个全局组件
// 2、实现一个KVueRouter类，管理url变化

let Vue;

class KVueRouter {
  constructor(options) {
    // 保存选项
    this.$options = options;
    //设置响应式的current属性
    // new Vue({data:{}})
    // Vue.util.defineReactive(this,'current','/')

    this.current = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "matched", []);
    // match方法可以递归遍历路由表获得匹配关系的数组
    this.match();

    // hashchange
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));

    // 对路由数组预处理：转换为map
    // this.routeMap = {}
    // this.$options.routes.forEach(route => {
    //   this.routeMap[route.path]=route
    // });
  }

  onHashChange() {
    // #/about
    this.current = window.location.hash.slice(1);
    this.matched = []
    this.match()
  }

  match(routes) {
    routes = routes || this.$options.routes;

    // 递归遍历路由表
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }

      // /about/info
      if (route.path !== "/" && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}

KVueRouter.install = function(_Vue) {
  // 保存构造函数
  Vue = _Vue;
  // 挂载$router
  // 怎么获取根实例的router选项
  // 利用全局混入，在beforeCreate钩子里面获取选项
  Vue.mixin({
    beforeCreate() {
      // router选项只存在于根实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 声明两个全局组件
  Vue.component("router-link", Link);
  Vue.component("router-view", View);
};

export default KVueRouter;
