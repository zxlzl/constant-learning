<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- store哪来，state是响应式的 -->
    <!-- store类有commit方法可以执行mutation -->
    <p @click="$store.commit('add')">{{$store.state.count}}</p>
    <p @click="$store.dispatch('asyncAdd')">async:{{$store.state.count}}</p>
    <!-- <p>{{$store.getters.doubleCount}}</p> -->
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log(this.$store);
      
      setTimeout(() => {
        this.$store.state.count++;
      }, 1000);
    },
  }
</script>

<style lang="scss" scoped>

</style>
