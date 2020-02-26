import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({  
	state: {
		user: {}
	},  
	getters: {},
  mutations: {
    // 设置登录用户信息
		setUser (state, data) {
			state.user = data;
		}
	}  
});