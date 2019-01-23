import { GET_TOP_LIST, INIT_LIST, CHANGE_NAV, GET_TOP_LIST_FAILUER, GET_DETAIL_TOPICS, GET_MY_UPS, CHANGE_COLLECT } from "./mutation_type"
const state = {
    navs:[{
		name:'首页',
		rname:'index',
		common:true,	
	},{
		name:'登录',
		rname:'login',
		logined:false,
	},{
		name:'个人',
		rname:'user',
		logined:true,
	},{
		name:'消息',
		rname:'uread',
		logined:true,
	},{
		name:'发布',
		rname:'issue',
		logined:true,
	},{
		name:'退出',
		rname:'exit',
		logined:true,
	},],
	title:'cnode',
    topicList: {
        failure: false,
        all: [],
        loading: true
    },
}


const mutations = {
    [GET_TOP_LIST](state, data) {
        //获取不到文章数据时，隐藏加载组件
        if (data.length <= 0) {
            state.topicList.loading = false;
        } else {
            state.topicList.loading = true;
            state.topicList.failure = false;
            state.topicList.all = state.topicList.all.concat(data);
        }

    },
    //重用组件时，初始化参数。
	[INIT_LIST](state){
		state.topicList.loading=true;
		state.topicList.failure=false;
		state.topicList.all=[];
    },
    // 改变导航
    [CHANGE_NAV](state,type){
		for(let tab of state.navs){
			if(tab.ename==type){
				tab.currentType=true
			}else{
				tab.currentType=false;
			}
        }
    },
    //后台原因获取文章失败时。
	[GET_TOP_LIST_FAILUER](state){
        console.log('fail')
		state.topicList.failure=true;
	},
}

export default {
    state,
    mutations
}