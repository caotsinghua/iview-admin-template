<template>
    <Form :model="form" :label-width="100" :rules="rules" ref="form" label-position="left">
        <div class="hidden">
            <input type="text" />
            <input type="password" />
        </div>
        <Row :gutter="10">
            <Col :span="12">
                <FormItem label="用户名" prop="userName">
                    <Input v-model.trim="form.userName" />
                </FormItem>
            </Col>
            <Col :span="12">
                <FormItem label="姓名" prop="realName">
                    <Input v-model.trim="form.realName" />
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :span="12">
                <FormItem label="rtx号码" prop="workNo">
                    <Input v-model.trim="form.workNo" @on-change="handleWorkNoChange" :disabled="!!this.userId" />
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="10">
            <!-- 新建时  才显示 -->
            <Col :span="12" v-if="!this.userId">
                <FormItem label="密码" prop="userPwd">
                    <Input v-model="form.userPwd" type="password" />
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :span="12">
                <FormItem label="手机号码" prop="mobile">
                    <Input v-model.trim="form.mobile" />
                </FormItem>
            </Col>
            <Col :span="12">
                <FormItem label="邮箱地址" prop="email">
                    <Input v-model.trim="form.email" />
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
import { addUser, updateUser } from '@/api/user';
import { getKeysObject } from '@/libs/util';
import store from '../store';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isOverDepartment: false,
            form: {
                userName: '',
                realName: '',
                userPwd: '',
                workNo: '',
                status: '0',
                mobile: '',
                email: '',
                entryDate: '',
                leaveDate: '',
                beforeDept: '',
                afterDept: '',
                transferTime: '',
                duty: 'N', // 职务
                region: ''
            },
            rules: {
                userName: [{ required: true, message: '该字段不能为空' }],
                userPwd: [{ required: true, message: '该字段不能为空' }],
                realName: [{ required: true, message: '该字段不能为空' }],
                workNo: [{ required: true, message: '该字段不能为空' }],
                duty: [{ required: true, message: '该字段不能为空' }],
                mobile: [{ required: true, message: '该字段不能为空' }],
                email: [{ required: true, message: '该字段不能为空' }]
            },
            userId: null,
            userData: null
        };
    },
    computed: {},
    watch: {
        'form.status': function(val, oldVal) {
            if (val === '1') {
                // 离职
                this.leaveDateRequired = true;
                this.rules.leaveDate = [{ required: true, message: '该字段不能为空' }];
            } else {
                this.leaveDateRequired = false;
                this.rules.leaveDate = [];
            }
        }
    },
    methods: {
        async submit() {
            const valid = await this.$refs['form'].validate();
            let success = valid;
            if (valid) {
                const postData = getKeysObject(this.form, [
                    'userName',
                    'realName',
                    'workNo',
                    'status',
                    'mobile',
                    'email',
                    'entryDate',
                    'leaveDate',
                    'userPwd',
                    'duty',
                    'region'
                ]);
                postData.entryDate = dayjs(postData.entryDate).format('YYYY-MM-DD');
                if (postData.leaveDate) {
                    postData.leaveDate = dayjs(postData.leaveDate).format('YYYY-MM-DD');
                } else {
                    postData.leaveDate = '';
                }
                if (store.state.curSelect && store.state.curSelect.deptId > 0) {
                    postData.deptId = store.state.curSelect.deptId;
                }
                let data;
                console.log('userid', this.userId);
                if (this.userId) {
                    console.log('更新用户');
                    // 更新
                    postData.userId = this.userId;
                    const res = await updateUser(postData);
                    data = res.data;
                } else {
                    // 新建用户
                    const res = await addUser(postData);
                    data = res.data;
                }
                success = data.code === '0';
                if (success) {
                    this.$Message.success('操作成功');
                    store.getData();
                }
            }
            return success;
        },
        init(userData) {
            this.userId = userData.userId;
            this.userData = userData;
            // 使用row数据初始化表单
            Object.assign(this.form, userData);
        },
        reset() {
            this.$refs['form'].resetFields();
            this.userId = null;
            this.leaveDateRequired = false;
            this.isOverDepartment = false;
            this.userData = null;
            // Object.assign(this, this.$options.data());
        },
        handleWorkNoChange(e) {
            let v = e.target.value;

            let deptAbbr = '';
            if (this.userData) {
                deptAbbr = this.getDeptAbbr(this.userData.deptId);
            } else {
                deptAbbr = this.getDeptAbbr(store.state.curSelect.deptId);
            }
            v = v && `${deptAbbr}${v}`;
            this.form.userName = v;
        },
        getDeptAbbr(deptId) {
            // 设置一级部门的简写
            if (!store.state.topDeptMap[deptId]) {
                const node = store.state.treeMap[deptId];
                let { parentDeptIds } = node;
                parentDeptIds = parentDeptIds.split(',');
                let topDept = store.state.topDeptMap[parentDeptIds[1]];
                return topDept.deptAbbr;
            } else {
                return store.state.topDeptMap[deptId].deptAbbr;
            }
        }
    }
};
</script>
<style>
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
    color: #999;
}
</style>
<style lang="less" scoped>
.hidden {
    position: absolute;
    left: -10000px;
    top: -10000px;
}
</style>
