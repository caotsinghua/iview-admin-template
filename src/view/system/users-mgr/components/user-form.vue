<template>
    <Form :model="form" :label-width="100" :rules="rules" ref="form" label-position="left">
        <!-- 阻止自动保存密码时自动填入 -->
        <div class="hidden">
            <input type="text" />
            <input type="password" />
        </div>
        <Row :gutter="10" type="flex">
            <Col :span="12">
                <FormItem label="用户名" prop="userName">
                    <!-- <p v-if="userId">{{ form.userName }}</p> -->
                    <Input v-model.trim="form.userName" />
                </FormItem>
            </Col>
            <Col :span="12">
                <FormItem label="姓名" prop="realName">
                    <Input v-model.trim="form.realName" />
                </FormItem>
            </Col>
            <!-- 新建时才显示密码框 -->
            <Col :span="12" v-if="!this.userId">
                <FormItem label="密码" prop="userPwd">
                    <Input v-model="form.userPwd" type="password" />
                </FormItem>
            </Col>
            <Col :span="12">
                <FormItem label="手机号码" prop="phone">
                    <Input v-model.trim="form.phone" />
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

export default {
    data() {
        return {
            form: {
                userName: '',
                realName: '',
                userPwd: '',
                phone: '',
                email: ''
            },
            rules: {
                userName: [{ required: true, message: '该字段不能为空' }],
                userPwd: [{ required: true, message: '该字段不能为空' }],
                realName: [{ required: true, message: '该字段不能为空' }],
                phone: [{ required: true, message: '该字段不能为空' }],
                email: [{ required: true, message: '该字段不能为空' }]
            },
            userId: null,
            userData: null
        };
    },
    methods: {
        async submit() {
            const valid = await this.$refs['form'].validate();
            let success = valid;
            if (valid) {
                const postData = getKeysObject(this.form, ['userName', 'userPwd', 'realName', 'phone', 'email']);

                // 是否选中部门,没有部门则不带deptId
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
            this.userData = null;
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
