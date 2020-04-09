<template>
  <div>
    <Node :data="folder"></Node>
  </div>
</template>

<script>
import Node from '@/components/recursion/Node.vue';

export default {
  components: {
    Node,
  },
  data() {
    return {
      folder: {
        name: "vue-study",
        children: [
          {
            name: "src",
            children: [{ name: "main.js" }],
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>