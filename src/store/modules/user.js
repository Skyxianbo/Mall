import { login, logout, getInfo, getPermission } from '@/api/login'
import { getToken, setToken, removeToken, setUser, removeUser } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    user: {},
    firstLogin: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_FIRST_LOGIN: (state, status) => {
      state.firstLogin = status;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.returnValue;
          setToken(data.token);
          setUser(data);
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data);
          commit('SET_FIRST_LOGIN', true);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.token != 'null' && state.token != 'undefined') {
          resolve();
        } else {
          reject();
        }
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          commit('SET_USER', '');
          removeToken();
          removeUser();
          resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 关闭首次登录
    CancelFirstLogin({ commit }) {
      return new Promise(resolve => {
        commit('SET_FIRST_LOGIN', false);
        resolve();
      })
    }
  }
}

export default user
