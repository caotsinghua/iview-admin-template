<template>
    <Modal v-model="visible" title="修改配置" width="700" @on-cancel="hide">
        <Form ref="basic-form" :model="form" :rules="rules" :label-width="100" label-position="left">
            <FormItem label="配置名称" prop="configName">
                <Input v-model="form.configName" />
            </FormItem>
            <FormItem label="描述">
                <Input v-model="form.configDesc" />
            </FormItem>
        </Form>
        <component :is="componentName" v-if="visible" ref="config-form"></component>
        <template slot="footer">
            <Button type="primary" :loading="submiting" @click="handleSubmit">更新</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>

<script>
import { updateConfigByCode } from '@/api/configs';
import store from '../store';
import LoginPolicyConfig from './config-templates/login-policy';
export default {
    components: {
        LoginPolicyConfig
    },
    data() {
        return {
            visible: false,
            row: null,
            submiting: false,
            componentName: 'LoginPolicyConfig',
            form: {
                configName: '',
                configDesc: ''
            },
            rules: {
                configName: [{ required: true, message: '该字段不能为空' }]
            }
        };
    },
    methods: {
        show(row) {
            this.row = row;
            this.visible = true;
            Object.assign(this.form, {
                configName: row.configName,
                configDesc: row.configDesc
            });
            this.$nextTick(() => {
                try {
                    this.$refs['config-form'].initData(row.configValue);
                } catch (e) {
                    this.$Message.error(e.message || '解析json错误');
                    throw e;
                }
            });
        },
        hide() {
            this.row = null;
            this.visible = false;
        },
        async handleSubmit() {
            const valid = this.$refs['basic-form'].validate();
            if (valid) {
                try {
                    this.submiting = true;
                    const configValue = this.$refs['config-form'].getFormData();
                    const { data } = await updateConfigByCode({
                        ...this.form,
                        configCode: this.row.configCode,
                        configValue
                    });
                    if (data.success) {
                        this.$Message.success('修改成功');
                        this.hide();
                        store.getData();
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
