function render(vnode, container) {
  // vnode->Node
  const node = createNode(vnode, container);
  container.appendChild(node);
}

// 创建节点
function createNode(vnode, parent) {
  const { props, type, children } = vnode;
  let node = null;
  if (type === "TEXT") {
    node = document.createTextNode(props.value);
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // node = type.prototype.isReactComponent
    //   ? updateClassComponent(vnode, parent)
    //   : updateFunctionComponent();
    // node = updateFunctionComponent(vnode,parent)
    console.log(vnode);
  }
  handleChildren(children, node);
  return node;
}

function handleChildren(children, node) {
  if (children.length !== 0) {
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      render(child, node);
    }
  }
}

// function updateClassComponent(vnode, parent) {}

function updateFunctionComponent(vnode, parent) {
  const {type, props} = vnode
  const vnodeFromFunction = type(props)
  const node = createNode(vnodeFromFunction,parent)
  return node
}

export default {
  render,
};
