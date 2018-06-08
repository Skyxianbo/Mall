import { login, logout, getInfo, getPermission } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permission: [],
    permissionTree: [],
    addticketIds: [], //添加白名单的时候的选中券id集合
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission;
    },
    SET_PERMISSION_TREE: (state, permissionTree) => {
      state.permissionTree = permissionTree;
    },
    SET_ADD_TICKET_IDS: (state, addticketIds) => {
      state.addticketIds = addticketIds;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.returnValue;
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.userName);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.token == 'admin') {
          resolve();
        } else {
          reject();
        }
        // getInfo(state.token).then(response => {
        //   const data = response.data;
        //   commit('SET_ROLES', data.role);
        //   commit('SET_NAME', data.name);
        //   commit('SET_AVATAR', data.avatar);
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '');
          commit('SET_ROLES', []);
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
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

    // 获取权限
    GetPermission({ commit }, callback) {
      return new Promise(resolve => {
        getPermission().then(response => {
          commit('SET_PERMISSION_TREE', response.returnValue.permission);
          commit('SET_ROLES', response.returnValue.role);
          commit('SET_NAME', response.returnValue.name || 'AUTH');
          if (resolve) {
            resolve(response.returnValue.permission);
          }
        })
      })
    },

    SetPermission({ commit }, permission) {
      commit('SET_PERMISSION', permission);
    },
    SetAddTicketIds({ commit }, addticketIds) {
      commit('SET_ADD_TICKET_IDS', addticketIds);
    }
  }
}

export default user
