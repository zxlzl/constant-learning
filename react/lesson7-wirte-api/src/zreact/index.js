function createElement(type, props, ...children) {
  if (props) {
    delete props.__self;
    delete props.__source;
  }

  return {
    type,
    props: {
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
      value: text,
    },
    children: [],
  };
}

export default {
  createElement,
};
