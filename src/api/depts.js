import axios from '@/libs/api.request';

export const getDepts = query =>
    axios.request({
        url: '/depts/page',
        params: query
    });

export const getDeptsList = query =>
    axios.request({
        url: '/depts/list',
        params: query
    });

export const addDept = data =>
    axios.request({
        url: '/depts',
        data,
        method: 'post'
    });

export const updateDept = data =>
    axios.request({
        url: '/depts',
        data,
        method: 'put'
    });
export const updateDeptStatus = ({ deptId, state }) =>
    axios.request({
        url: `/depts/updateStatus/${deptId}/${state}`,
        method: 'post'
    });

export const getDept = deptId =>
    axios.request({
        url: `/depts/${deptId}`
    });
export const getDeptUsers = deptId =>
    axios.request({
        url: `/depts/${deptId}/users`
    });
