import Mock from 'mockjs';
import { login, logout, getUserStatus } from './login';
import { success, getSuccess } from './common-res';
import './users';
import './system';
import './roles';

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 100
});

// 登录相关和获取用户信息
Mock.mock(/\/sys\/login/, login);
Mock.mock(/\/sys\/logout/, logout);
Mock.mock(/\/user\/curUser/, getUserStatus); // 获取当前登陆用户
Mock.mock(/\/user\/password/, 'post', success); // 修改密码

// 操作日志
Mock.mock(
    /\/operate-log\/page/,
    'get',
    getSuccess({
        currPage: 0,
        list: [
            {
                browserName: '',
                createBy: '',
                createByRealName: '',
                createByUserName: '',
                createTime: '',
                operDesc: '',
                operIp: '',
                operMethod: '',
                operSysName: '',
                requestMethod: '',
                requestParameter: '',
                requestUri: '',
                spendTime: 0,
                sysLogId: 0,
                userAgent: ''
            }
        ],
        pageSize: 0,
        totalCount: 0,
        totalPage: 0
    })
);
export default Mock;
