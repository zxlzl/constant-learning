<template>
  <div>
    <h3>Form表单</h3>
    <hr />
    <Form :model="model" :rules="rul" ref="loginForm">
      <FormItem label="用户名" prop="username">
        <Input v-model="model.username" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem >
        <button @click="submit">登录</button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Input from "./Input";
import FormItem from "./FormItem";
import Form from "./Form";
import Notice from '@/components/Notice.vue';

export default {
  components: {
    Input,
    FormItem,
    Form,
    Notice
  },
  data() {
    return {
      model: { username: "zxl", password: "" },
      rul: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert('请求成功')
        } else {
          this.$create(Notice,{
            title: '效验失败',
            message: '失败，请检查表单信息',
            duration :3000
          }).show()
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>