// import './index.css'
import indexStyle from './style/index.scss'

// file
import pic from './images/kol.png'

var img = new Image();
img.src = pic;
img.classList.add(indexStyle.box);
var root = document.getElementById("root");
root.append(img);

console.log('index page', indexStyle.box)