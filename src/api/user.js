import axios from '@/libs/api.request';

export const login = ({ userName, password }) => {
    const data = {
        userName,
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
        url: '/sys/logout',
        method: 'post'
    });
};
// 获取当前用户信息
export const getUserStatus = () =>
    axios.request({
        url: '/user/curUser'
    });

// 更新密码
export const updatePassword = data =>
    axios.request({
        url: '/user/password',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data),
        method: 'post'
    });
// 重置密码
export const resetPassword = userId =>
    axios.request({
        url: '/user/reset-pwd',
        params: {
            userId
        }
    });
export const addUser = data =>
    axios.request({
        url: '/user',
        data,
        method: 'post'
    });
// 分页查询用户列表
export const getUsers = query =>
    axios.request({
        url: '/user/page',
        params: query
    });
// 查询全部用户
export const getUsersList = query =>
    axios.request({
        url: '/user',
        params: query
    });
export const getDeptUsers = query => {
    const deptId = query.deptId;
    delete query.deptId;
    return axios.request({
        url: `/dept/${deptId}/users`,
        params: query
    });
};
// 更新用户
export const updateUser = data =>
    axios.request({
        url: `/user`,
        data,
        method: 'put'
    });
export const getDeptFlowUsers = deptId =>
    axios.request({
        url: `/dept-flowuser/${deptId}/users`
    });
