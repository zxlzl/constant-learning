<template>
  <div>
    <p>{{xx}}</p>
    <button @click="sayHi">say hi</button>
    <!-- $attrs -->
    <p v-on="$listeners">{{$attrs.msg}}</p>
    <!-- provide/inject -->
    <p>{{bar2}}</p>
    <p>{{app.$options.name}}</p>
    <!-- 插槽 -->
    <slot></slot>
    <div>
      <slot name="content" baz="content from child"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    inject: {
      bar2: 'bar',
      app: 'app'
    },
    data() {
      return {
        xx: 'xx',
        bar: 'my bar'
      }
    },
    mounted() {
      // 监听事件
      this.$root.$on('foo', msg => {
        console.log(msg);
        
      })
    },
    methods: {
      sayHi() {
        // 派发者和监听者是同一个
        // this.$parent.$emit('foo', 'something from brother')
        this.$root.$emit('foo', 'something from brother')

      }
    },
  }
</script>

<style scoped>

</style>