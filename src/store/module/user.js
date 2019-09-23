import { login, logout, getUserStatus } from '@/api/user';
import { setToken, getToken } from '@/libs/util';
import config from '@/config';
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
    async handleLogin({ commit }, loginData) {
        const { data } = await login(loginData);
        if (data.success) {
            /**
             * @description 登陆时是否清空顶部tagList
             */
            // const tagNavList = rootState.app.tagNavList;
            // const tagList = [];
            // if (tagNavList[0] && tagNavList[0].name === config.homeName) {
            //     tagList.push(tagNavList[0]);
            // }
            // commit('setTagNavList', tagList);
            const logged = await dispatch('getUserStatus');
            return logged;
        }
        return false;
    },

    // 退出登录
    async handleLogOut({ state, commit, rootState }) {
        const { router, vm } = appContainer;
        const { data } = await logout();
        commit('setHasLogged', false);
        commit('setHasGetInfo', false);
        commit('setUserInfo', {});
        commit('setAccess', []);
        if (router) {
            router.replace({
                name: 'login'
            });
            /**
             * @description 需要退出登陆重置app时使用
             */
            // vm.$nextTick(() => {
            //     appContainer.isRebuild = true;
            //     initApp();
            // });
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
