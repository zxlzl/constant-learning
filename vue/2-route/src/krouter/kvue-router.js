import Link from './krouter-link'
import View from './krouter-view'

// 1、实现一个插件：挂载$router，声明两个全局组件
// 2、实现一个KVueRouter类，管理url变化

let Vue;

class KVueRouter{
  constructor(options){
    // 保存选项
    this.$options = options
    //设置响应式的current属性
    // new Vue({data:{}})
    Vue.util.defineReactive(this,'current','/')

    // hashchange
    window.addEventListener('hashchange',this.onHashChange.bind(this))
    window.addEventListener('load',this.onHashChange.bind(this))

    // 对路由数组预处理：转换为map
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path]=route
    });
  }

  onHashChange(){
    // #/about
    this.current = window.location.hash.slice(1)
  }
}

KVueRouter.install = function(_Vue) {
  // 保存构造函数
  Vue=_Vue
  // 挂载$router
  // 怎么获取根实例的router选项
  // 利用全局混入，在beforeCreate钩子里面获取选项
  Vue.mixin({
    beforeCreate(){
      // router选项只存在于根实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 声明两个全局组件
  Vue.component('router-link',Link)
  Vue.component('router-view',View)

}

export default KVueRouter