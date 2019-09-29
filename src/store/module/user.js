import { login, logout, getUserStatus } from '@/api/user';
import { setToken, getToken } from '@/libs/util';
import { appContainer } from '@/libs/common-utils';
// import config from '@/config';
const state = {
    userInfo: {},
    token: getToken(),
    access: '', // 菜单权限
    hasGetInfo: false,
    hasLogged: false
};

const mutations = {
    setUserInfo(state, userInfo) {
        state.userInfo = {};
        Object.assign(state.userInfo, userInfo, {
            userName: userInfo.name,
            userId: userInfo.user_id,
            avatar: userInfo.avatar
        });
    },
    setAccess(state, access) {
        state.access = access;
    },
    setToken(state, token) {
        // 设置token到cookie
        state.token = token;
        setToken(token);
    },
    setHasGetInfo(state, status) {
        state.hasGetInfo = status;
    },
    setHasLogged(state, status) {
        state.hasLogged = status;
    }
};
const actions = {
    // 登录
    async handleLogin({ commit, dispatch }, loginData) {
        const { data } = await login(loginData);
        if (data.success) {
            // 登陆成功后获取用户信息
            const logged = await dispatch('getUserStatus');
            return logged;
        }
        return false;
    },

    // 退出登录
    async handleLogOut({ state, commit, rootState }) {
        const { router } = appContainer;
        const { data } = await logout();
        commit('setHasLogged', false);
        commit('setHasGetInfo', false);
        commit('setUserInfo', {});
        commit('setAccess', []);
        if (router) {
            router.replace({
                name: 'login'
            });
        }
        return data;
    },
    // 获取用户信息和状态
    async getUserStatus({ commit }, status) {
        // 直接设置登陆态
        if (status !== undefined) {
            commit('setHasLogged', status);
            return;
        }
        const { data } = await getUserStatus();
        if (data.success && data.data) {
            commit('setUserInfo', data.data);
            commit('setHasLogged', true);
            commit('setHasGetInfo', true);
            commit('setAccess', data.data.roles);
            return true;
        } else {
            commit('setHasGetInfo', false);
            commit('setUserInfo', {});
            commit('setAccess', []);
            commit('setHasLogged', false);
            return false;
        }
    }
};

export default {
    namespaced: false,
    state,
    mutations,
    actions
};
