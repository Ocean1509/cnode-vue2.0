import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action'
import all from './mutations'
Vue.use(Vuex);
export default new Vuex.Store({
	actions,
	state: all.state,
	mutations: all.mutations
});
