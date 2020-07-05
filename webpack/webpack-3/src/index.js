import css from "./style/index.css"
import less from "./style/index.less"

import pic from './images/logo.jpeg'

import axios from 'axios'

axios.get("/api/info").then(res=>{
  console.log(res);
})

let img = new Image()
img.src = pic
console.log(pic);

let root = document.getElementById('app')
root.append(img)

console.log('home');