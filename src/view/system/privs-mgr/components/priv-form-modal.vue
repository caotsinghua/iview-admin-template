<template>
    <Modal v-model="visible" :title="isEdit ? '编辑权限' : '添加权限'" width="50%">
        <Form ref="form" :model="form" :label-width="80" :rules="rules">
            <Row>
                <Col :span="12">
                    <FormItem label="父级权限">
                        <treeselect
                            v-model="form.parentPrivId"
                            :options="storeState.privsTreeData"
                            placeholder="请选择父级权限"
                            clearable
                            noOptionsText="没有可选权限"
                        >
                            <label slot="option-label" slot-scope="{ node }">
                                <Icon type="ios-folder" v-if="node.children" color="#2d8cf0" />
                                <Icon type="ios-leaf" v-else color="#19be6b" />
                                <span>{{ node.label }}</span>
                            </label>
                        </treeselect>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="10">
                <Col :xl="12"
                    ><FormItem label="权限名称" prop="privName"> <Input v-model.trim="form.privName" /> </FormItem
                ></Col>
                <Col :xl="12">
                    <FormItem label="路由名称" prop="privUri" :required="form.privType !== 'A'" :show-message="false">
                        <Input v-model.trim="form.privUri" /> </FormItem
                ></Col>
            </Row>
            <Row :gutter="10">
                <Col :xl="12"
                    ><FormItem label="图标" prop="privIcon"> <Input v-model.trim="form.privIcon" /> </FormItem
                ></Col>
                <Col :xl="12"
                    ><FormItem label="类型" prop="privType">
                        <Select v-model="form.privType">
                            <Option value="C">目录</Option>
                            <Option value="M">菜单</Option>
                            <Option value="A">操作</Option>
                        </Select>
                    </FormItem></Col
                >
            </Row>
            <Row :gutter="10">
                <Col :xl="12"
                    ><FormItem label="权限编码" prop="privCode"> <Input v-model.trim="form.privCode" /> </FormItem
                ></Col>
                <Col :xl="12"
                    ><FormItem label="是否显示" prop="isShow">
                        <Select v-model="form.isShow">
                            <Option value="Y">显示</Option>
                            <Option value="N">不显示</Option>
                        </Select>
                    </FormItem></Col
                >
            </Row>
            <Row :gutter="10">
                <Col :xl="12"
                    ><FormItem label="排序" prop="privOrder"> <InputNumber v-model="form.privOrder" /> </FormItem
                ></Col>
            </Row>

            <FormItem label="备注" prop="remarks">
                <Input v-model.trim="form.remarks" />
            </FormItem>
        </Form>
        <template slot="footer">
            <Button type="primary" @click="handleSubmit">提交</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>
<script>
import { addPriv, updatePriv } from '@/api/privs';
import store from '../store';
import { getKeysObject } from '@/libs/util';
export default {
    data() {
        return {
            visible: false,
            form: {
                isShow: 'Y', // 是否显示（Y:显示，N：不显示）
                privCode: '',
                privIcon: '',
                privName: '',
                privOrder: 0,
                privType: 'A', // 类型(C:目录,M:菜单,A:操作)
                privUri: '',
                remarks: '',
                parentPrivId: null
            },
            rules: {
                // isShow: [{ required: true, message: '该字段不能为空' }], // 是否显示（Y:显示，N：不显示）
                privCode: [{ required: true, message: '该字段不能为空' }],
                // privIcon: [{ required: true, message: '该字段不能为空' }],
                privName: [{ required: true, message: '该字段不能为空' }],
                // privOrder: [{ required: true, message: '该字段不能为空' }],
                privType: [{ required: true, message: '该字段不能为空' }] // 类型(C:目录,M:菜单,A:操作)
                // privUri: [{ required: true, message: '该字段不能为空' }]
            },
            storeState: store.state,
            isEdit: false,
            privId: ''
        };
    },
    methods: {
        show(row, isEdit = false) {
            this.isEdit = isEdit;
            if (isEdit) {
                const temp = getKeysObject(row, [
                    'privCode',
                    'privIcon',
                    'privName',
                    'privOrder',
                    'privUri',
                    'privType',
                    'remarks',
                    'parentPrivId',
                    'isShow'
                ]);
                Object.assign(this.form, temp);
                this.form.parentPrivId = this.form.parentPrivId || null;
                this.privId = row.privId;
            } else if (row && row.privId) {
                this.form.parentPrivId = row.privId;
            }
            this.visible = true;
        },
        hide() {
            this.form = this.$options.data().form;
            this.visible = false;
        },
        async handleSubmit() {
            const formData = Object.assign({}, this.form);
            const valid = await this.$refs.form.validate();
            if (!formData.parentPrivId) formData.parentPrivId = 0;
            if (valid) {
                if (this.isEdit) {
                    formData.privId = this.privId;
                    const { data } = await updatePriv(formData);
                    if (data.success && data.data) {
                        this.$Message.success('更新成功');
                        store.getPrivsData();
                        this.hide();
                    }
                } else {
                    const { data } = await addPriv(formData);
                    if (data.success && data.data) {
                        this.$Message.success('添加成功');
                        store.getPrivsData();
                        this.hide();
                    }
                }
            }
        }
    }
};
</script>
