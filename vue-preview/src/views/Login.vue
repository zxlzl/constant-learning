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
      window.isLogin = true
      this.$router.push(this.$route.query.redirect)
    },
    logout() {
      window.isLogin = false
      this.$router.push('/')
    }
  },
  computed: {
    isLogin() {
      return window.isLogin 
    }
  },
};
</script>

<style lang="scss" scoped>
</style>