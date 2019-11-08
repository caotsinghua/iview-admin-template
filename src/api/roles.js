import axios from '../libs/api.request';
/**
 * 角色管理api
 * 权限管理api
 *
 */

export const getRoles = query =>
    axios.request({
        url: '/roles/page',
        params: query
    });
export const addRole = data =>
    axios.request({
        url: '/roles',
        data,
        method: 'post'
    });
// 查询角色的用户
export const getRoleUsers = ({ roleId, currPage, pageSize }) =>
    axios.request({
        url: `roles/${roleId}/users`,
        params: {
            currPage,
            pageSize
        }
    });
export const deleteRole = roleId =>
    axios.request({
        url: `/roles/${roleId}`,
        method: 'delete'
    });

// 给角色添加一些用户
export const addRoleUsers = (roleId, userIds) =>
    axios.request({
        url: `/roles/${roleId}/users`,
        data: userIds,
        method: 'post'
    });

// 获取某个用户的角色
export const getUserRoles = ({ userId, currPage, pageSize }) =>
    axios.request({
        url: `/roles/${userId}/roles`,
        params: {
            currPage,
            pageSize
        }
    });
// 给用户添加一些角色
export const addUserRoles = (userId, roleIds) =>
    axios.request({
        url: `/roles/${userId}/roles`,
        data: roleIds,
        method: 'post'
    });
// 删除用户的一些角色
export const deleteUserRoles = (userId, roleIds) =>
    axios.request({
        url: `/roles/${userId}/roles`,
        data: roleIds,
        method: 'delete'
    });

// ===权限管理

export const getPrivs = query =>
    axios.request({
        url: '/privs',
        params: query
    });
// 添加权限
export const addPriv = data =>
    axios.request({
        url: 'privs',
        data,
        method: 'post'
    });
export const deletePriv = privId =>
    axios.request({
        url: `/privs/${privId}`,
        method: 'delete'
    });
// 获取某个角色的权限
export const getRolePrivs = roleId =>
    axios.request({
        url: `/privs/${roleId}/privs`
    });
// 给角色添加权限列表
export const addRolePrivs = (roleId, privIds) =>
    axios.request({
        url: `/privs/${roleId}/privs`,
        data: privIds,
        method: 'post'
    });
export const getRolesNotInUser = ({ userId, currPage, pageSize }) =>
    axios.request({
        url: `roles/not/${userId}/roles`,
        params: {
            currPage,
            pageSize
        }
    });
export const getUsersNotInRole = ({ roleId, currPage, pageSize, keyword }) =>
    axios.request({
        url: `roles/not/${roleId}/users`,
        params: { currPage, pageSize, keyword }
    });
export const updateRole = data => {
    return axios.request({
        url: `/roles/${data.roleId}`,
        method: 'put',
        data: {
            roleName: data.roleName
        }
    });
};
