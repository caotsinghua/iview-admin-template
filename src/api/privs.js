import axios from '../libs/api.request';

export const getPrivs = query =>
    axios.request({
        url: '/privs',
        params: query
    });
export const addPriv = data =>
    axios.request({
        url: '/privs',
        data,
        method: 'post'
    });
export const updatePriv = data =>
    axios.request({
        url: '/privs',
        data,
        method: 'put'
    });
export const deletePriv = privId =>
    axios.request({
        url: `/privs/${privId}`,
        method: 'delete'
    });
// 获取登陆用户的菜单权限
export const getUserMenuPrivs = () =>
    axios.request({
        url: '/privs/menus'
    });
export const getUserOpreratePrivs = () =>
    axios.request({
        url: '/privs/operate'
    });
// 获取角色权限
export const getRolePrivs = roleId =>
    axios.request({
        url: `/privs/${roleId}/privs`
    });
export const addRolePrivs = ({ roleId, privIds }) =>
    axios.request({
        url: `/privs/${roleId}/privs`,
        data: privIds,
        method: 'post'
    });
// 删除角色的权限
export const deleteRolePrivs = ({ roleId, privIds }) =>
    axios.request({
        url: `/privs/${roleId}/privs`,
        data: privIds,
        method: 'delete'
    });
// 查询未赋予该角色的权限
export const getPrivsNotInRole = roleId =>
    axios.request({
        url: `/privs/not/${roleId}/privs`
    });
