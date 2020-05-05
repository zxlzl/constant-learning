export default {
  render(h){
    // 1、标记当前router-view深度
    // 2、路由匹配时获取代表深度层级的matched数组
    this.$vnode.data.routerView = true

    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++
        }
      }
      parent = parent.$parent
    }

    // this指向当前组件实例
    // 动态获取current对应的组件
    // let component = null
    // const route = this.$router.routeMap[this.$router.current]
    // if (route) {
    //   component = route.component
    // } 


    let component = null
    const route = this.$router.matched[depth]
    if (route) {
      component = route.component
    }

    return h(component)
  }
}