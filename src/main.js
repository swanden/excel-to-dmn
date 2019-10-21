import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from './store';

import App from './App.vue';
import SimpleTableForm from "./components/SimpleTableForm";
import IncidenceTableForm from "./components/IncidenceTableForm";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/simple' },
    { path: '/simple', component: SimpleTableForm },
    { path: '/incidence', component: IncidenceTableForm }
  ]
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
