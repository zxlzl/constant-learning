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
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode, parent)
      : updateFunctionComponent(vnode, parent);
  } else if (typeof type === "undefined") {
    node = document.createDocumentFragment();
  }
  handleChildren(children, node);
  updateNode(node,props)
  return node;
}

function handleChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    if (Array.isArray(child)) {
      child.forEach((item) => render(item, node));
    } else {
      render(child,node)
    }
  }
}

function updateClassComponent(vnode, parent) {
  const { type, props } = vnode;
  const component = new type(props);
  const vnodeFromClass = component.render();
  const node = createNode(vnodeFromClass, parent);
  return node;
}

function updateFunctionComponent(vnode, parent) {
  const { type, props } = vnode;
  const vnodeFromFunction = type(props);
  const node = createNode(vnodeFromFunction, parent);
  return node;
}

function updateNode(node, props) {
  Object.keys(props).forEach(prop=>{
    if (prop.slice(0,2)==="on") {
      let eventName = prop.slice(2).toLowerCase()
      node.addEventListener(eventName,props[prop])
    } else {
      node[prop]=props[prop]
    }
  })
}

export default {
  render,
};
