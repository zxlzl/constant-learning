<template>
  <div>
    <h3>login page</h3>
    <button @click="login" v-if="!isLogin">登陆</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>

import {mapState,mapActions} from 'vuex'
export default {
  methods: {
    login() {
      // window.isLogin = true;
      // 提交mutation
      // this.$store.commit("user/login");
      // 派发动作触发actions
      // this.$store.dispatch("user/login", "admin").then(() => {
      this["user/login"]("admin").then(() => {
        this.$router.addRoutes([
          {
            path: "/admin",
            name: "admin",
            component: () => import("../views/Admin.vue"),
            children: [
              {
                path: "/admin/course/:name",
                name: "detail",
                component: () => import("../views/Detail.vue")
              }
            ],
            meta: {
              auth: true
            }
            // beforeEnter(to, from, next) {
            //   if (window.isLogin) {
            //     next()
            //   } else {
            //     next('/login?redirect='+to.fullPath)
            //   }
            // }
          }
        ]);

        this.$router.push(this.$route.query.redirect);
      }).catch(() => {
        alert('用户名或密码错误，请重试！')
      });

      // 动态添加路由

      
    },
    logout() {
      // window.isLogin = false;
      this.$store.commit("user/logout");
      this.$router.push("/");
    },
    ...mapActions(['user/login','user/logout'])
  },
  computed: {
    // isLogin() {
    //   return this.$store.state.user.isLogin;
    // },
    ...mapState('user',['isLogin'])
  }
};
</script>

<style lang="scss" scoped>
</style>