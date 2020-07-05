// import "@babel/polyfill" // 垫片 包含所有es6+新特性
// import css from "./style/index.css"
import less from "./style/index.less";

const a = require('./number')
const list = require('./list/index')

a

// import counter from "./counter.js";
// import number from "./number.js";

// counter()
// number();

// if (module.hot) {
//   module.hot.accept("./number.js",function(){
//     document.body.removeChild(document.getElementById("number"));
//     number()
//   })
// }

// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function () {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };

// import pic from './images/logo.jpeg'

// import axios from 'axios'

// axios.get("/api/info").then(res=>{
//   console.log(res);
// })

// let img = new Image()
// img.src = pic
// console.log(pic);

// let root = document.getElementById('app')
// root.append(img)

// console.log('home');

// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => { console.log(item);
// });

import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));
