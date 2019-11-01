<template>
    <div class="roles">
        <Card title="角色列表">
            <Button type="primary" @click="handleAdd">添加角色</Button>
            <Divider />
            <el-table
                :data="storeState.roles"
                :highlight-current-row="true"
                :row-class-name="getRowClassName"
                @row-click="handleRowClick"
                ref="roles-table"
                v-loading="storeState.roleLoading"
                size="mini"
            >
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleType" label="角色类型" :formatter="roleTypeFormatter"> </el-table-column>
                <el-table-column prop="remark" label="角色备注"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{ row }">
                        <Button type="error" @click.stop="handleDelete(row)" size="small" icon="md-trash"></Button>
                    </template>
                </el-table-column>
            </el-table>
            <Page
                :current="storeState.rolePage"
                :page-size="storeState.rolePageSize"
                :total="storeState.roleTotal"
                show-total
                @on-change="handleRolePageChange"
                @on-page-size-change="handleRolePageSizeChange"
                style="text-align:right;margin-top:10px;"
            />
        </Card>
        <Modal title="编辑角色" v-model="visible" @on-cancel="hideModal">
            <Form ref="role-form" :model="roleForm" :label-width="100" :rules="rules">
                <FormItem label="角色名称" prop="roleName">
                    <Input v-model.trim="roleForm.roleName" />
                </FormItem>
                <FormItem label="角色备注" prop="remark">
                    <Input v-model.trim="roleForm.remark" />
                </FormItem>
                <FormItem label="角色编码" prop="roleCode">
                    <Input v-model.trim="roleForm.roleCode" />
                </FormItem>
                <FormItem label="角色类型" prop="roleType">
                    <Select v-model="roleForm.roleType">
                        <Option v-for="dict in this[dictMap.role_type]" :key="dict.dictValue" :value="dict.dictValue">{{
                            dict.dictLabel
                        }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <template slot="footer">
                <Button type="primary" @click="handleSubmit">提交</Button>
                <Button @click="hideModal">取消</Button>
            </template>
        </Modal>
    </div>
</template>
<script>
import store from '../store';
import { deleteRole, addRole } from '@/api/roles';
import { dictMap } from '@/constants';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            storeState: store.state,
            visible: false,
            roleForm: { roleName: '', remark: '', roleCode: '', deptId: '', roleType: '' },
            rules: {
                roleName: [{ required: true, message: '该字段不能为空' }],
                roleCode: [{ required: true, message: '该字段不能为空' }],
                roleType: [{ required: true, message: '该字段不能为空' }]
            },
            dictMap
        };
    },
    computed: {
        ...mapState('system', [dictMap.role_type])
    },
    async mounted() {
        await store.getRoles();
        console.log(this.$store.state);
    },
    methods: {
        handleDelete(role) {
            this.$Modal.confirm({
                title: '警告',
                content: '确定删除此角色吗？',
                onOk: async () => {
                    const { data } = await deleteRole(role.roleId);
                    if (data.success) {
                        this.$Message.success('删除成功');
                        store.getRoles();
                    }
                }
            });
        },
        handleAdd() {
            this.showModal();
        },
        getRowClassName({ row }) {
            return row.roleId === this.storeState.selectRoleId
                ? 'row-selected'
                : row.disabled
                ? 'row-disabled'
                : 'row-common';
        },
        hideModal() {
            this.$refs['role-form'].resetFields();
            this.visible = false;
        },
        showModal() {
            this.visible = true;
        },
        async handleSubmit() {
            const valid = await this.$refs['role-form'].validate();
            if (valid) {
                const formData = { ...this.roleForm };
                const { data } = await addRole(formData);
                if (data.success) {
                    this.$Message.success('添加成功');
                    store.getRoles();
                    this.hideModal();
                }
            }
        },
        handleRowClick(currentRow) {
            if (!currentRow.disabled) {
                store.toggle(currentRow, this.$refs['roles-table'].setCurrentRow, this);
            }
        },
        handleRolePageChange(page) {
            if (page === this.storeState.rolePage) return;
            store.getRoles({ page });
        },
        handleRolePageSizeChange(pageSize) {
            store.getRoles({ page: 1, pageSize });
        },
        roleTypeFormatter(_, __, value) {
            if (value) {
                const findItem =
                    this[dictMap.roleType] && this[dictMap.roleType].find(item => item.dictValue === value);
                return findItem && findItem.dictLabel;
            }
            return value;
        }
    }
};
</script>
<style>
.el-table__body tr.row-selected > td {
    background: rgba(214, 107, 25, 0.42);
}
.el-table__body tr.row-selected:hover > td {
    background: rgba(214, 107, 25, 0.42);
}
.el-table__body tr.row-common > td {
    background: #fff;
}
</style>
<style lang="less">
.el-table tr.row-disabled {
    background: #eee;
    // pointer-events: none; // ie11+
    cursor: not-allowed;
}
</style>
