// import { getParams } from '@/libs/util';
import { getSuccess, success } from './common-res';
export const login = req => {
    req = JSON.parse(req.body);
    return getSuccess({
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
        realName: 'mock-real',
        roles: ['A'],
        state: 0,
        userId: 0,
        userName: 'mockuser',
        userPwd: ''
    });
};

export const logout = () => {
    return success;
};

export const getUserStatus = () => {
    return getSuccess({
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
        realName: 'mock-real',
        roles: ['A'],
        state: 0,
        userId: 0,
        userName: 'mockuser',
        userPwd: ''
    });
};
