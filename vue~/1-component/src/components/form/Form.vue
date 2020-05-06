<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Form",
  componentName: "Form",
  provide() {
    return {
      // 将表单实例直接传递给后代
      form: this
    };
  },
  data() {
    return {
      fields: []
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  created() {
    this.fields = [];

    this.$on("form.addFiled", item => {
      this.fields.push(item);
    });
  },
  methods: {
    validate(cb) {
      // const tasks = this.$children
      //   .filter(item => item.prop)
      //   .map(item => item.validate());
      const tasks = this.fields.map(item => item.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>