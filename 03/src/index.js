// // import axios from 'axios'

// // axios.get('/api/info').then(res => {
// //   console.log(res)
// // })

// // import './index.css'
// import './style/index.scss'

// // file
// // import pic from './images/kol.png'

// // var img = new Image();
// // img.src = pic;
// // img.classList.add(indexStyle.box);
// // var root = document.getElementById("root");
// // root.append(img);

// // console.log('index page', indexStyle.box)

// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function () {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };

// import React, {Component} from 'react';
// import ReactDom from 'react-dom';
// class App extends Component {
//   render () {
//     return <div>hello world</div>;
//   }
// }
// ReactDom.render (<App />, document.getElementById ('app'));

import app from './index.vue'
import Vue from 'vue'
new Vue({
  el: '#app',
  components: {
    app
  }
})


