/**
 * 用户管理mock
 */
import Mock from 'mockjs';
import { success, getSuccess } from './common-res';

export const getUsers = () =>
    getSuccess([
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
            phone: '',
            pwdSalt: '',
            realName: '',
            roles: [],
            state: 0,
            userId: 0,
            userName: '',
            userPwd: ''
        }
    ]);
export const getUsersPage = () =>
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
                phone: '',
                pwdSalt: '',
                realName: '',
                roles: [],
                state: 0,
                userId: 0,
                userName: '',
                userPwd: ''
            }
        ],
        pageSize: 0,
        totalCount: 0,
        totalPage: 0
    });

Mock.mock(/\/user\/page/, getUsersPage); // 分页查询用户列表
Mock.mock(/\user\/reset-pwd?userId=[\w]+.+/, 'get', success); // 重置密码
Mock.mock(/\/user/, getUsers);
Mock.mock(/\/user/, 'post', success); // 新增用户
Mock.mock(/\/user/, 'put', success); // 更新用户
