import axios from '@/libs/api.request';
import qs from 'qs';
export const login = ({ username, password }) => {
    const data = {
        username,
        password
    };
    return axios.request({
        url: '/sys/login',
        data,
        method: 'post'
    });
};

export const logout = () => {
    return axios.request({
        url: '/sys/logout'
    });
};
// 获取当前用户信息
export const getUserStatus = () =>
    axios.request({
        url: '/users/cur-user'
    });

// 更新密码
export const updatePassword = data =>
    axios.request({
        url: '/users/password',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data),
        method: 'post'
    });
// 重置密码
export const resetPassword = userId =>
    axios.request({
        url: `/users/${userId}/reset-pwd`
    });
export const addUser = data =>
    axios.request({
        url: '/users',
        data,
        method: 'post'
    });
// 分页查询用户列表
export const getUsers = query =>
    axios.request({
        url: '/users/page',
        params: query
    });
// 查询全部用户
export const getUsersList = query =>
    axios.request({
        url: '/users',
        params: query
    });
export const getDeptUsers = query => {
    const deptId = query.deptId;
    delete query.deptId;
    return axios.request({
        url: `/depts/${deptId}/users`,
        params: query
    });
};
// 更新用户
export const updateUser = data =>
    axios.request({
        url: `/users`,
        data,
        method: 'put'
    });
