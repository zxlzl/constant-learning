<template>
  <div>
    <h3>login page</h3>
    <button @click="login" v-if="!isLogin">登陆</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // window.isLogin = true;
      // 提交mutation
      // this.$store.commit("login");
      // 派发动作触发actions
      this.$store.dispatch("login", "admin").then(() => {
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
      }).catch(()=>{
        alert('出错 重试')
      });

      // 动态添加路由

      
    },
    logout() {
      // window.isLogin = false;
      this.$store.commit("logout");
      this.$router.push("/");
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>