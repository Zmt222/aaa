import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api/index.js'

import utils from './utils/index.js'

import menuConf from './conf/menuConf.js'

Vue.use(Vuex);


//设置store的内容
var store = new Vuex.Store({
  state: {
    ...menuConf,
    ...utils,
    api,
    isLogin: false,
    userInfo: {},
    searchStatus: '',
    searchWaybillCode: '',
    assistConfigure: {
      clearanceStatus: [],
      upgradeReasons: [],
      followUsers: [],
      groups: []
    },
    configure: {
      clearanceStatus: [],
      upgradeReasons: [],
      followUsers: [],
      groups: []
    }
  },
  mutations: {
    login(state, payload) {
      state.isLogin = true;
      state.userInfo = payload;
      localStorage.setItem(
        "userInfo",
        JSON.stringify(payload)
      );
      state.breadcrumbList = [{
        title: '主页',
        href: '/index/home'
      }];
    },
    refresh(state, payload) {
      state.isLogin = true;
      state.userInfo = payload;
      for (let item of state.menuList) {
        const hash = location.hash.slice(1);
        let subItem = item.children.find((item) => {
          return item.href === hash
        });
        if (subItem) {
          state.breadcrumbList = [subItem];
          break
        }
      }
    },
    logout(state, payload) {
      localStorage.removeItem("userInfo");
      state.isLogin = false;
      state.userInfo = {};
    },
    navigateTo(state, payload) {
      for (let item of state.menuList) {
        let subItem = item.children.find((item) => {
          return item.href === payload
        });
        if (subItem) {
          state.breadcrumbList = [subItem];
          break
        }
      }
    },
    navigateToAssist(state, payload) {
      for (let item of state.assistmenuList) {
        let subItem = item.children.find((item) => {
          return item.href === payload
        });
        if (subItem) {
          state.breadcrumbList = [subItem];
          break
        }
      }
    },
    search(state, payload) {
      if (Object.prototype.toString.call(payload) === '[object Object]') {
        Object.keys(payload).forEach(item => {
          state[item] = payload[item];
        });
      }
    },
    resetSearch(state, payload) {
      state.searchStatus = '';
      state.searchWaybillCode = '';
    },
    setConfigure(state, payload) {
      state.configure = payload;
    },
    setAssistConfigure(state, payload) {
      state.assistConfigure = payload;
    }
  },
  actions: {
    getConfigure(context) {
      Vue.prototype.$http.post(context.state.api.loginController.common())
        .then(res => {
          if (res.data.result) {
            context.commit('setConfigure', res.data);
          } else {
            Vue.prototype.$Message.error("获取公共配置失败");
          }
        });
      Vue.prototype.$http.post(context.state.api.loginController.common(),{flag:'1'})
        .then(res => {
          if (res.data.result) {
            context.commit('setAssistConfigure', res.data);
          } else {
            Vue.prototype.$Message.error("获取公共配置失败");
          }
        });
    }
  },
  strict: true
});
export default store


