import { createApp } from 'vue'
import App from './App.vue'
import store from './store'


import { BootstrapVue3 } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { FontAwesomeIcon } from './plugins/font-awesome'

import router from './router'

createApp(App)
    .use(router)
    .use(store)
    .use(BootstrapVue3)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
