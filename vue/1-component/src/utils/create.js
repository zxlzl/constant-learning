import Vue from 'vue'

export function create(Component, props) {
  // 1.Vue.extend
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({propsData: props})
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove=()=>{
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }

  // 借助vue构造函数实例化组件
  // const vm = new Vue({
  //   // h是createElement别名,返回虚拟dom
  //   render(h) {
  //     return h(Component, { props })
  //   }
  // })

  // // 真实dom
  // vm.$mount()

  // // 拿到真实dom 挂到body
  // document.body.appendChild(vm.$el)

  // // 拿到组件实例
  // const comp = vm.$children[0]

  // comp.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   comp.$destroy()
  // }
  
  return comp
}
