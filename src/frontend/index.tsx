import store from './store';
import React from "react";
import {render} from "react-dom";
import ReactApp from './ReactApp';

render(<ReactApp/>, document.getElementById('app'));

// import Vue from "vue";
// import App from "./App.vue";


// new Vue({
//   el: '#app',
//   render: h => h(App)
// });