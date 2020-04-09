<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@mixins/emitter";

export default {
  inject: ["form"],
  componentName: "FormItem",
  mixins: [emitter],
  data() {
    return {
      error: ""
    };
  },

  props: {
    label: {
      type: String,
      default: ""
    },
    prop: String
  },
  mounted() {
    this.$on("validata", () => {
      this.validate();
    });
    if (this.prop) {
      this.dispatch("Form", "form.addFiled", [this]);
    }
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];

      const validator = new Schema({ [this.prop]: rules });

      return new Promise((resolve, reject) => {
        validator.validate({ [this.prop]: value }, errors => {
          if (errors) {
            this.error = errors[0].message;
            reject();
          } else {
            this.error = "";
            resolve();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>