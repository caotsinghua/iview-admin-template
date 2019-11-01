<template>
    <Modal v-model="visible" title="编辑部门" width="700" @on-cancel="hide">
        <Form
            ref="addOrgForm"
            :model="addOrgForm"
            :label-width="120"
            class="detail_form"
            :rules="ruleValidate"
            :style="{ width: '95%' }"
            v-if="visible"
        >
            <Row :gutter="35">
                <Col
                    :xs="{ span: 22 }"
                    :sm="{ span: 22 }"
                    :md="{ span: 22 }"
                    :lg="{ span: 12 }"
                    :style="{ maxWidth: '450px' }"
                >
                    <FormItem label="上级部门" prop="parentDeptId">
                        <treeselect
                            v-model="addOrgForm.parentDeptId"
                            :options="deptList"
                            placeholder="请选择部门"
                            noOptionsText="没有可选部门"
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
            <Row :gutter="35">
                <Col
                    :xs="{ span: 22 }"
                    :sm="{ span: 22 }"
                    :md="{ span: 22 }"
                    :lg="{ span: 12 }"
                    :style="{ maxWidth: '450px' }"
                >
                    <FormItem label="部门名称" prop="deptName">
                        <Input
                            placeholder="请输入部门名称"
                            type="text"
                            v-model="addOrgForm.deptName"
                            :maxlength="50"
                        ></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="35">
                <Col
                    :xs="{ span: 22 }"
                    :sm="{ span: 22 }"
                    :md="{ span: 22 }"
                    :lg="{ span: 12 }"
                    :style="{ maxWidth: '450px' }"
                >
                    <FormItem label="排序号" prop="treeSort">
                        <InputNumber :min="0" :max="999999999" v-model="addOrgForm.treeSort"></InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="35">
                <Col
                    :xs="{ span: 22 }"
                    :sm="{ span: 22 }"
                    :md="{ span: 22 }"
                    :lg="{ span: 12 }"
                    :style="{ maxWidth: '450px' }"
                >
                    <FormItem label="部门类型" prop="deptType">
                        <Select v-model="addOrgForm.deptType" placeholder="请选择">
                            <Option v-for="item in deptTypeList" :value="item.value" :key="item.value">
                                {{ item.label }}</Option
                            >
                        </Select>
                    </FormItem>
                </Col>
            </Row>

            <Row :gutter="35">
                <Col
                    :xs="{ span: 22 }"
                    :sm="{ span: 22 }"
                    :md="{ span: 22 }"
                    :lg="{ span: 22 }"
                    :style="{ maxWidth: '450px' }"
                >
                    <FormItem label="备注" prop="remark">
                        <Input
                            placeholder="请输入备注"
                            type="text"
                            v-model="addOrgForm.remark"
                            :maxlength="100"
                        ></Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <template slot="footer">
            <Button type="primary" @click="save">提交</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>
<script>
import { mapActions } from 'vuex';
import { getDept, updateDept, addDept } from '@/api/depts';
export default {
    name: '',
    data() {
        return {
            addOrgForm: {
                parentDeptId: null,
                deptName: null,
                treeSort: null,
                deptType: '',
                remark: null
            },
            deptTypeList: [{ value: 'A', label: '一级部门' }, { value: 'N', label: '非一级部门' }],
            deptList: [],
            ruleValidate: {
                deptName: [
                    {
                        required: true,
                        message: '必须填写部门名称'
                    }
                ],
                treeSort: [
                    {
                        required: true,
                        message: '必须填写排序号'
                    }
                ],
                deptType: [{ required: true, message: '必须选择部门类型' }]
            },
            visible: false,
            deptId: '',
            parentDeptId: ''
        };
    },

    methods: {
        ...mapActions('system', ['getDeptTreeList']),
        async show(row) {
            this.deptId = row.deptId;
            this.parentDeptId = row.parentDeptId;
            this.visible = true;
            this.deptList = await this.getDeptTreeList();
            if (this.deptId) this.initData();
            if (this.parentDeptId && this.parentDeptId !== 0) {
                this.addOrgForm.parentDeptId = this.parentDeptId;
            }
        },
        hide() {
            Object.assign(this, this.$options.data());
        },
        initData() {
            getDept(this.deptId).then(
                res => {
                    if (res.data.success === true) {
                        this.addOrgForm = Object.assign({}, res.data.data);
                        if (this.addOrgForm.parentDeptId === 0) this.addOrgForm.parentDeptId = null;
                    }
                },
                err => {
                    console.log(err);
                }
            );
        },
        save() {
            let result = null;
            this.$refs['addOrgForm'].validate(valid => {
                if (valid) {
                    let params = Object.assign({}, this.addOrgForm);
                    if (!params.parentDeptId) params.parentDeptId = 0;
                    if (this.deptId) {
                        params.deptId = this.deptId;
                    }
                    this.submit(params);
                } else {
                    result = false;
                }
            });
            return result;
        },
        submit(params) {
            if (params.deptId) {
                updateDept(params).then(
                    res => {
                        // 可用post请求，this.$http.post('api/getNewsList',{'userId':123})
                        if (res.data.success === true) {
                            this.$Message.success('修改成功');
                            this.hide();
                            this.$emit('submit', true);
                        }
                    },
                    err => {
                        console.log(err);
                        this.$emit('submit', false);
                    }
                );
            } else {
                addDept(params).then(
                    res => {
                        // 可用post请求，this.$http.post('api/getNewsList',{'userId':123})
                        if (res.data.success === true) {
                            this.$Message.success('添加成功');
                            this.hide();
                            this.$emit('submit', true);
                        }
                    },
                    err => {
                        console.log(err);
                        this.$emit('submit', false);
                    }
                );
            }
        }
    }
};
</script>
<style>
.card-tag .ivu-row {
    margin-bottom: 10px;
}
</style>
