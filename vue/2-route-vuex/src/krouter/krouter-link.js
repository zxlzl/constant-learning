// 需要属性to
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  render(h) {
    //渲染结果：<a href="/xxx">abc</a>
    //渲染函数的三个参数：标签名称，属性集合，子元素数组
    return h("a", { attrs: { href: "#" + this.to } }, [this.$slots.default]);
    // jsx
    // console.log(h);
    // return <a href={"#" + this.to}>{this.$slots.default}</a>;
  },
};
