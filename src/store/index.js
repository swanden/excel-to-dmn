import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import tables from './modules/tables';

export const store = new Vuex.Store({
    modules: {
        tables
    },
    strict: process.env.NODE_ENV !== 'production'
});