export default {
  render(h){
    let component = null
    // this指向当前组件实例
    // 动态获取current对应的组件
    const route = this.$router.routeMap[this.$router.current]
    if (route) {
      component = route.component
    } 

    return h(component)
  }
}