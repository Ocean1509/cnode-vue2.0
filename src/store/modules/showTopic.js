import { GET_TOP_LIST, INIT_LIST, GET_TOP_LIST_FAILUER, GET_DETAIL_TOPICS, GET_MY_UPS, CHANGE_COLLECT } from "../mutation_type"
import * as type from '../mutation_type'
import Vue from 'vue'
import axios from 'axios'
/**
 * get请求
 * api请求地址
 * https://cnodejs.org/api/v1
 */
const _get = (url, query) => {
	let _url;
	if (query) {
		_url = `https://cnodejs.org/api/v1${url}?${query}`
	} else {
		_url = `https://cnodejs.org/api/v1${url}`
	}
	return axios.get(_url)
		.then((res) => {
			if (res.status >= 200 && res.status < 300) {
				return res.data;
			}
			return Promise.reject(new Error(res.status));

		})
}

/**
 * post请求
 * api请求地址
 * https://cnodejs.org/api/v1
 */
const _post = (url, data) => {
	let _url = `https://cnodejs.org/api/v1${url}`;
	return Vue.http.post(_url, data)
		.then((res) => {
			if (res.status >= 200 && res.status < 300) {
				return res.json()
			}

			return Promise.reject(new Error(res.status))
		})
}


const state = {
	data: {
		failure: false,
		all: [],
		loading: true,
		content: '',
		comment: '', //评论
		myups: [],
		loginname: ''
	},


}
const mutations = {
	[GET_TOP_LIST](state, data) {
		//获取不到文章数据时，隐藏加载组件
		if (data.length <= 0) {
			state.data.loading = false;
		} else {
			state.data.loading = true;
			state.data.failure = false;
			state.data.all = state.data.all.concat(data)
		}

	},
	//重用组件时，初始化参数。
	[INIT_LIST](state) {
		state.data.loading = true;
		state.data.failure = false;
		state.data.all = [];
	},
	//后台原因获取文章失败时。
	[GET_TOP_LIST_FAILUER](state) {
		state.data.failure = true;
	},
	//获取详细文章信息
	[GET_DETAIL_TOPICS](state, data) {
		state.data.loginname = data.author.loginname;
		state.data.comment = data.replies;
		const userId = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : "";
		state.data.myups = [];
		//通过判断是否有用户点赞的id，为每一个comment对象增加myups的属性,方便页面渲染显示点赞状态。
		for (let [key, value] of state.data.comment.entries()) {
			state.data.myups.push(false)
			for (let el of value.ups) {
				if (el == userId) {
					state.data.myups.splice(key, 1, true)
					break;
				}
			}
		}
		state.data.content = data;
		state.data.loading = false;
	},
	//改变点赞状态
	[GET_MY_UPS](state, index) {
		state.data.myups.splice(index, 1, !state.data.myups[index]);
		const userId = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : "";
		let arry = state.data.comment[index].ups;
		let flag = -1;
		for (let [key, val] of arry.entries()) {
			if (val == userId) {
				flag = key;
				break
			}
		}
		if (flag > -1) {
			arry.splice(flag, 1);
		} else {
			arry.push(userId);
		}
	},
	//改变收藏状态
	[CHANGE_COLLECT](state) {
		state.data.content.is_collect = !state.data.content.is_collect;
	}
}

const actions = {
	//获取文章列表
	getTopic({ dispatch, commit }, obj) {
		var tab = obj.type;
		var page = obj.page;
		// const url=`/topics/${tab}`;
		const url = '/topics';
		// const query = `tab=${tab}&page=${page}`;
		const query = `tab=${tab}&page=${page}`;
		// const query=`tab=${tab}&page=14`
		_get(url, query).then((json) => {
			if (json.success) {
				commit(type.GET_TOP_LIST, json.data);
				commit(type.CHANGE_NAV, tab)
			}
		}).catch((error) => {
			commit(type.GET_TOP_LIST_FAILUER, tab)
		})
	},
	initTopic({ dispatch, commit }) {
		commit('INIT_LIST')
	}
}
export default {
	state, mutations, actions
}
