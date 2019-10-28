import Mock from 'mockjs';
import { success, getSuccess } from './common-res';
/**
 * 系统相关mock
 */
export const getEnv = () => {
    return getSuccess({
        activeEnv: 'dev'
    });
};

// 生成验证码
export const genContext = () => {
    return getSuccess('210f60a507fa8c31564d73eac7a00d43');
};

export const getPrivs = function() {
    return getSuccess([
        {
            isShow: '',
            parentPrivId: 0,
            privCode: '',
            privIcon: '',
            privId: 1,
            privName: '',
            privOrder: 0,
            privType: '',
            privUri: '',
            remarks: ''
        }
    ]);
};
// 查询用户菜单权限
export const getMenuPrivs = function() {
    return getSuccess([
        {
            privId: 43,
            parentPrivId: 41,
            privType: 'M',
            privUri: 'users-mgr',
            privIcon: '',
            privCode: 'users-mgr'
        },
        {
            privId: 69,
            parentPrivId: 68,
            privType: 'M',
            privUri: 'operate-log',
            privIcon: 'ios-list-box-outline',
            privCode: 'operate-log'
        },

        {
            privId: 46,
            parentPrivId: 41,
            privType: 'M',
            privUri: 'privs-mgr',
            privIcon: '',
            privCode: 'privs-mgr'
        },
        {
            privId: 68,
            parentPrivId: 0,
            privType: 'M',
            privUri: 'operate',
            privCode: 'operate'
        },
        {
            privId: 68,
            parentPrivId: 0,
            privType: 'C',
            privUri: 'operate-log',
            privCode: 'operate-log'
        },
        { privId: 41, parentPrivId: 0, privType: 'C', privUri: 'system', privIcon: '', privCode: 'system' },
        {
            privId: 44,
            parentPrivId: 41,
            privType: 'M',
            privUri: 'roles-mgr',
            privIcon: '',
            privCode: 'roles-mgr'
        },
        {
            privId: 101,
            parentPrivId: 100,
            privType: 'M',
            privUri: 'todos',
            privIcon: '',
            privCode: 'todos'
        },
        {
            privId: 101,
            parentPrivId: 100,
            privType: 'M',
            privUri: 'todos-list',
            privIcon: '',
            privCode: 'todos-list'
        }
    ]);
};
// 查询未赋予该角色的权限
export const getNotInRolePrivs = function() {
    return getSuccess([
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
    ]);
};
// 查询用户操作权限
export const getOperatePrivs = function() {
    return getSuccess([
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
    ]);
};

export const getRolePrivs = () =>
    getSuccess([
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
    ]);

Mock.mock(/\/sys\/env/, getEnv);
Mock.mock(/\/sys\/gencontext/, genContext);

Mock.mock(/\/privs\/menus/, 'get', getMenuPrivs);
Mock.mock(/\/privs\/not\/[\w]+\/privs/, 'get', getNotInRolePrivs);
Mock.mock(/\/privs\/operate/, 'get', getOperatePrivs);
Mock.mock(/\/privs\/[\w]+\/privs/, 'get', getRolePrivs);
Mock.mock(/\/privs\/[\w]+\/privs/, 'post', success); // 添加角色权限
Mock.mock(/\/privs\/[\w]+\/privs/, 'delete', success); // 删除角色权限

Mock.mock(/\/privs\/[\w]+/, 'delete', success); // 删除权限
Mock.mock(/\/privs/, 'get', getPrivs);
Mock.mock(/\/privs/, 'post', success);
Mock.mock(/\/privs/, 'put', success);
