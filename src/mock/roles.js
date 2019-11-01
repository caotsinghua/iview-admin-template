/**
 * 角色相关mock
 */
import Mock from 'mockjs';
import { success, getSuccess } from './common-res';

export const getRoles = () =>
    getSuccess({
        currPage: 1,
        list: [
            {
                deptId: 0,
                isShow: true,
                remark: '',
                roleCode: '',
                roleId: 0,
                roleName: 'mock角色1',
                roleOrder: 0,
                roleType: '1'
            }
        ],
        pageSize: 10,
        totalCount: 1,
        totalPage: 1
    });
export const getRolesNotUsers = () =>
    getSuccess({
        currPage: 0,
        list: [
            {
                deleteFlag: true,
                deptId: 0,
                duty: '',
                menuPrivs: [
                    {
                        isShow: '',
                        parentPrivId: 0,
                        privCode: '',
                        privIcon: '',
                        privId: 0,
                        privName: '',
                        privOrder: 0,
                        privType: '',
                        privUri: '',
                        remarks: ''
                    }
                ],
                operatePrivs: [
                    {
                        isShow: '',
                        parentPrivId: 0,
                        privCode: '',
                        privIcon: '',
                        privId: 0,
                        privName: '',
                        privOrder: 0,
                        privType: '',
                        privUri: '',
                        remarks: ''
                    }
                ],
                phone: '12321',
                pwdSalt: '',
                realName: '12312',
                roles: [],
                state: 0,
                userId: 0,
                userName: 'aaa',
                userPwd: 'aaa'
            }
        ],
        pageSize: 0,
        totalCount: 0,
        totalPage: 0
    });
export const getRoleUsers = () =>
    getSuccess({
        currPage: 0,
        list: [
            {
                deleteFlag: true,
                deptId: 0,
                duty: '',
                menuPrivs: [
                    {
                        isShow: '',
                        parentPrivId: 0,
                        privCode: '',
                        privIcon: '',
                        privId: 0,
                        privName: '',
                        privOrder: 0,
                        privType: '',
                        privUri: '',
                        remarks: ''
                    }
                ],
                operatePrivs: [
                    {
                        isShow: '',
                        parentPrivId: 0,
                        privCode: '',
                        privIcon: '',
                        privId: 0,
                        privName: '',
                        privOrder: 0,
                        privType: '',
                        privUri: '',
                        remarks: ''
                    }
                ],
                phone: '12',
                pwdSalt: 'asd',
                realName: 'sadds',
                roles: [],
                state: 0,
                userId: 0,
                userName: 'asaa',
                userPwd: 'asdsa'
            }
        ],
        pageSize: 0,
        totalCount: 0,
        totalPage: 0
    });

export const getUserRoles = () =>
    getSuccess({
        currPage: 0,
        list: [
            {
                deptId: 0,
                isShow: '',
                remark: 'asdsda',
                roleCode: '1231',
                roleId: 0,
                roleName: 'asdas',
                roleOrder: 0,
                roleType: '213'
            }
        ],
        pageSize: 0,
        totalCount: 0,
        totalPage: 0
    });

Mock.mock(/\/roles\/not\/[\w]+\/users/, getRolesNotUsers); // 查询未赋予某角色用户列表
Mock.mock(/\/roles\/[\w]+\/users/, getRoleUsers); // 查询角色用户列表
Mock.mock(/\/roles\/[\w]+\/users/, 'post', success); // 添加角色用户
Mock.mock(/\/roles\/[\w]+\/roles/, getUserRoles); // 查询用户角色
Mock.mock(/\/roles\/[\w]+\/roles/, 'post', success); // 添加用户角色
Mock.mock(/\/roles\/[\w]+\/roles/, 'delete', success); // 删除用户角色
Mock.mock(/\/roles\/[\w]+/, 'delete', success); // 删除角色
Mock.mock(/\/roles/, 'get', getRoles);
Mock.mock(/\/roles/, 'post', success); // 添加角色
