import css from "./style/index.css"
import less from "./style/index.less"

import pic from './images/logo.jpeg'

let img = new Image()
img.src = pic

let root = document.getElementById('app')
root.append(img)