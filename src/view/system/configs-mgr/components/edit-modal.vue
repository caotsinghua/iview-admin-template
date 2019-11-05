<template>
    <Modal v-model="visible" :title="`${this.row ? '更新' : '创建'}表单`" width="500" @on-cancel="hide">
        <Form ref="form" :model="form" :label-width="100" :rules="rules" label-position="left">
            <FormItem label="配置名" prop="configName">
                <Input v-model="form.configName" placeholder="请输入配置名..." :readonly="readOnly" />
            </FormItem>
            <FormItem label="配置值" prop="configValue">
                <Input type="textarea" v-model="form.configValue" placeholder="请输入配置值..." :readonly="readOnly" />
            </FormItem>
            <FormItem label="配置编码" prop="configCode">
                <Input v-model="form.configCode" placeholder="请输入..." :readonly="readOnly" />
            </FormItem>
            <FormItem label="描述" prop="configDesc">
                <Input v-model="form.configDesc" placeholder="请输入..." :readonly="readOnly" />
            </FormItem>
        </Form>
        <template slot="footer">
            <Button type="primary" :loading="submiting" v-if="!readOnly" @click="handleSubmit">{{
                this.row ? '更新' : '提交'
            }}</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>

<script>
import { addConfig, updateConfigByCode } from '@/api/configs';
import { getKeysObject } from '@/libs/util';
import store from '../store';
export default {
    data() {
        return {
            visible: false,
            row: null,
            submiting: false,
            readOnly: false,
            form: {
                configCode: '',
                configDesc: '',
                configName: '',
                configValue: ''
            },
            rules: {
                configCode: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ],
                configName: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ],
                configValue: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ]
            }
        };
    },
    methods: {
        show(row, readOnly) {
            this.row = row;
            this.readOnly = !!readOnly;
            if (row) {
                Object.assign(this.form, getKeysObject(row, ['configCode', 'configDesc', 'configName', 'configValue']));
            }
            this.visible = true;
        },
        hide() {
            this.$refs['form'].resetFields();
            this.row = null;
            this.visible = false;
        },
        async handleSubmit() {
            const valid = await this.$refs['form'].validate();
            if (valid) {
                let success, message;
                try {
                    this.submiting = true;
                    if (this.row) {
                        const { data } = await updateConfigByCode(this.form);
                        success = data.success;
                        message = data.message;
                    } else {
                        const { data } = await addConfig(this.form);
                        success = data.success;
                        message = data.message;
                    }
                    if (success) {
                        this.$Message.success('操作成功');
                        this.hide();
                        store.getData();
                    } else {
                        this.$Message.error(message || '操作失败');
                    }
                } catch (e) {
                    throw e;
                } finally {
                    this.submiting = false;
                }
            }
        }
    }
};
</script>
