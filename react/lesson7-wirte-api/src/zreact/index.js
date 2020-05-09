function createElement(type, props, ...children) {
  if (props) {
    delete props.__self;
    delete props.__source;
  }
  let defaultProps = {}
  // 浅克隆
  if (type&&type.defaultProps) {
    defaultProps= {...type.defaultProps}
  }
  return {
    type,
    props: {
      ...defaultProps,
      ...props,
    },
    children: children.map((child) => {
      return typeof child === "object" ? child : createTextNode(child);
    }),
  };
}

function createTextNode(text) {
  return {
    type: "TEXT",
    props: {
      nodeValue: text,
    },
    children: [],
  };
}

export default {
  createElement,
};
