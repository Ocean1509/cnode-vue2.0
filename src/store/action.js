import * as type from './mutation_type'
import Vue from 'vue'
import { setErrorMeg } from '../error-handing'
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
	return axios.post(_url, data)
		.then((res) => {
			if (res.status >= 200 && res.status < 300) {
				return res.json()
			}

			return Promise.reject(new Error(res.status))
		})
}

const actions = {
	/****初始化首页列表内容*****/
	initTopic({ commit }) {
		commit(type.INIT_LIST)
	},
	getTopic({ commit }, obj) {
		const url = '/topics';
		let tab = obj.type;
		let page = obj.page;
		const query = `tab=${tab}&page=${page}`;
		_get(url, query).then((json) => {
			if (json.success) {
				commit(type.GET_TOP_LIST, json.data);
				commit(type.CHANGE_NAV, tab)
			}
		}).catch((error) => {
			commit(type.GET_TOP_LIST_FAILUER, tab)
		})
	}
}

export default actions