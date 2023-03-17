import { loginApi, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    user: null,
  }
}

const state = getDefaultState()

const mutations = {
   RESET_STATE: (state) => {
     Object.assign(state, getDefaultState())
   },
  /*  SET_TOKEN: (state, token) => {
     state.token = token
   },
   SET_NAME: (state, name) => {
     state.name = name
   },
   SET_AVATAR: (state, avatar) => {
     state.avatar = avatar
   }, */
  SET_USER: (state, payload) => {
    state.user = payload;
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        const { data } = res;
        if (data) {//表示有数据
          commit("SET_USER", data);
          resolve(data);
        } else {//没有数据
          reject(res);
        }
      }).catch((error) => reject(error));
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        if (typeof res === "string") {//验证不通过
          res = JSON.parse(res);
          if (res.code === 401) {
            reject(res.msg)
          }
        } else {//验证通过
          commit("SET_USER", res.data);
          resolve()
        }
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();//删除token
      resetRouter();//重置路由
      commit('RESET_STATE');
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

