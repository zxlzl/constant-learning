<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>

      <span v-if="isLogin">
        {{welcome}}
        <button>注销</button>
      </span>
    </nav>

    <!-- <form-test></form-test> -->

    <!-- 路由出口 -->
    <keep-alive include="admin">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import FormTest from "@/components/FormTest.vue";
export default {
  name: "app",
  computed: {
    ...mapState("user", ["isLogin"]),
    ...mapGetters("user", ["welcome"])
  },
  components: {
    // FormTest
  }
};
</script>

<style lang="scss">
a {
  color: $color;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#app {
  /deep/ .inp {
    border: 1px solid #2687e7;
  }
}
</style>
