<template>
  <div>
    <h2>detail page</h2>
    <p>{{$route.params.name}}</p>
  </div>
</template>

<script>
  export default {
    created () {
      console.log('发送详情请求');
    },
  }
</script>

<style lang="scss" scoped>

</style>