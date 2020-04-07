<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  inject: ["form"],
  data() {
    return {
      error: ""
    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: String
  },
  mounted () {
    this.$on("validata", ()=>{
      this.validate()
    });
  },
  methods: {
    validate() {
      const rules = this.from.rules[this.prop]
      const value = this.from.model[this.prop]

      const validator = new Schema({[this.prop]: rules})

      return new Promise((resolve,reject) => {
        validator.validate({[this.prop]: value}, errors=>{
          if (errors) {
            this.error = errors[0].message
            reject()
          } else {
            this.error = ''
            resolve()
          }
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>