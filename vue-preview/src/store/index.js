import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
  actions: {
    // 参数1是vuex传递的上下文context:{commit,dispatch,state}
    login({ commit }, username) {
      // 模拟登陆api调用，1s后如果用户名是admin登陆成功
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin") {
            commit("login");
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    },
  },
  mudules: {},
});
