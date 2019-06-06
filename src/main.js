import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueNoty from 'vuejs-noty';
import VueGeolocation from 'vue-browser-geolocation';
window.axios = axios;
Vue.use(VueNoty, {
    progressBar: false,
    layout: 'bottomRight',
    theme: 'bootstrap-v4',
    timeout: 3000
});
Vue.use(VueGeolocation);
new Vue({
  el: '#app',
  render: h => h(App)
});
