import Vue from 'vue'
import Vuex from 'vuex'

//实现一个插件：$store
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:1
  },
  mutations: {
    add(state){
      state.count++
    }
  },
  getters: {
    doubleCount: state=>{
      return state.count*2
    }
  },
  actions: {
    asyncAdd({commit}){
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
