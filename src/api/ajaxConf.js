import Vue from 'vue'
import router from './../router/index'

import Qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'

import utils from './../store/utils/index'


const axios_instance = axios.create({
  transformRequest: [function (data) {
    data = utils.formatDate(data);
    data = Qs.stringify(data);
    return data;
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  timeout: 10000
});

axios_instance.interceptors.response.use((res) => {
  if (res.data.code === '401') {
    Vue.prototype.$Message.error(res.data.message);
    localStorage.removeItem("userInfo");
    router.push("/login");
  }
  return res
}, (error) => {
  Vue.prototype.$Message.error(error.toString());
  return Promise.reject(error)
});

Vue.use(VueAxios, axios_instance);
