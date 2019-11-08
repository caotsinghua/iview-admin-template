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
                <!-- <el-table-column prop="roleType" label="角色类型" :formatter="roleTypeFormatter"> </el-table-column> -->
                <el-table-column prop="remark" label="角色备注"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{ row }">
                        <Button
                            type="error"
                            @click.stop="handleDelete(row)"
                            size="small"
                            icon="md-trash"
                            style="margin-right:5px"
                            v-if="row.sysFlag !== '1'"
                        ></Button>
                        <Button
                            type="warning"
                            @click.stop="handleEdit(row)"
                            size="small"
                            icon="ios-create-outline"
                        ></Button>
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
                <FormItem label="角色备注" prop="remark" v-if="!this.editRow">
                    <Input v-model.trim="roleForm.remark" />
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
import { deleteRole, addRole, updateRole } from '@/api/roles';

export default {
    data() {
        return {
            storeState: store.state,
            visible: false,
            roleForm: { roleName: '', remark: '' },
            rules: {
                roleName: [{ required: true, message: '该字段不能为空' }]
            },
            editRow: null // 是否编辑角色
        };
    },
    async mounted() {
        await store.getRoles();
        this.toggleDefault();
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
                        await store.getRoles();
                        if (role.roleId === this.storeState.selectRoleId) {
                            this.toggleDefault();
                        }
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
        showModal(row) {
            if (row) {
                this.editRow = row;
                this.roleForm.roleName = row.roleName;
            } else {
                this.editRow = null;
            }
            this.visible = true;
        },
        handleEdit(row) {
            this.showModal(row);
        },
        async handleSubmit() {
            const valid = await this.$refs['role-form'].validate();
            if (valid) {
                const formData = { ...this.roleForm };
                let data = {};
                if (this.editRow) {
                    const { data: tmpData } = await updateRole({ ...formData, roleId: this.editRow.roleId });
                    data = tmpData;
                } else {
                    // 添加角色
                    const { data: tmpData } = await addRole(formData);
                    data = tmpData;
                }
                if (data.success) {
                    this.$Message.success(this.editRow ? '更新成功' : '添加成功');
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
        toggleDefault() {
            if (this.storeState.roles.length > 0) {
                this.handleRowClick(this.storeState.roles[0]);
            }
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
