<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p @click="onClick">
      ahaha
      <!-- <router-link :to="`/course/${name}`">hahahaha</router-link> -->
    </p>

    <!-- 嵌套内容出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      name: "zxl"
    };
  },
  methods: {
    onClick() {
      // this.$router.push(`/course/${name}`)
      this.$router.push({ name: "detail", params: { name: name } });
    }
  }
};
</script>
