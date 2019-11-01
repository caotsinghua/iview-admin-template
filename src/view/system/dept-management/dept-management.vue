<template>
    <div>
        <Card>
            <p slot="remark"><Icon type="help-buoy"></Icon>部门管理</p>
            <Row style="margin-bottom:20px;">
                <Button @click="addOrg" type="primary">新增部门</Button>
            </Row>
            <Row class="searchable-table">
                <zk-table
                    ref="table"
                    sum-text="sum"
                    index-text="#"
                    :data="deptData"
                    :columns="columns"
                    :stripe="props.stripe"
                    :border="props.border"
                    :show-header="props.showHeader"
                    :show-summary="props.showSummary"
                    :show-row-hover="props.showRowHover"
                    :show-index="props.showIndex"
                    :tree-type="props.treeType"
                    :is-fold="props.isFold"
                    :expand-type="props.expandType"
                    :selection-type="props.selectionType"
                >
                    <template slot="icon" slot-scope="scope">
                        <span>
                            <Icon
                                type="cube"
                                color="#2d8cf0"
                                v-if="scope.row.children || scope.row.parentDeptId === -1"
                                size="16"
                                style="cursor:default"
                            ></Icon>
                            <Icon
                                type="leaf"
                                color="#19be6b"
                                v-else
                                size="16"
                                style="cursor:default;margin-left:16px"
                            ></Icon>
                            <span>{{ scope.row.deptName }}</span>
                        </span>
                        <!-- {{ scope.row.likes.join(',') }} -->
                    </template>
                    <template slot="deptType" slot-scope="scope">
                        <span v-if="scope.row.deptType === 'A'"
                            ><Icon type="ios-cube" color="#2d8cf0"></Icon>一级部门</span
                        >
                        <span v-if="scope.row.deptType === 'N'"
                            ><Icon type="ios-leaf" color="#19be6b"></Icon>非一级部门</span
                        >
                        <!-- {{ scope.row.likes.join(',') }} -->
                    </template>
                    <template slot="state" slot-scope="scope">
                        <span v-if="scope.row.state === 'Y'" style="color:green">有效</span>
                        <span v-if="scope.row.state === 'N'" style="color:red">无效</span>
                        <!-- {{ scope.row.likes.join(',') }} -->
                    </template>

                    <template slot="edit" slot-scope="scope">
                        <i-switch
                            v-model="scope.row.state"
                            @on-change="changeStates(scope.row)"
                            true-value="Y"
                            false-value="N"
                            style="margin-right:10px"
                        ></i-switch>
                        <Icon @click="addOrg(scope.row)" type="md-add" color="#19be6b" size="18"></Icon>
                        <Icon @click="editOrg(scope.row)" type="md-create" color="#2d8cf0" size="18"></Icon>
                    </template>
                </zk-table>
            </Row>
        </Card>
        <editModal ref="edit-modal" @submit="getData" />
    </div>
</template>

<script>
import editModal from './dept-add-or-edit.vue';
import { mapActions } from 'vuex';
import userMgrStore from '../users-mgr/store';
import { updateDeptStatus } from '@/api/depts';
export default {
    name: 'query-list',
    components: {
        editModal
    },
    data() {
        return {
            formItem: {
                userName: '',
                realName: ''
            },
            props: {
                stripe: false,
                border: false,
                showHeader: true,
                showSummary: false,
                showRowHover: true,
                showIndex: false,
                treeType: true,
                isFold: false,
                expandType: false,
                selectionType: false
            },
            deptData: [],
            columns: [
                {
                    label: '部门名称',
                    prop: 'deptName',
                    width: '300px'
                },
                {
                    label: '排序号',
                    prop: 'treeSort',
                    width: '80px'
                },
                {
                    label: '部门类型',
                    prop: 'deptType',
                    type: 'template',
                    template: 'deptType',
                    width: '110px'
                },
                {
                    label: '更新时间',
                    prop: 'updateTime',
                    width: '110px'
                },
                {
                    label: '备注信息',
                    prop: 'remark',
                    width: '110px'
                },
                {
                    label: '状态',
                    prop: 'state',
                    type: 'template',
                    template: 'state'
                },
                {
                    label: '操作',
                    prop: 'edit',
                    minWidth: '200px',
                    type: 'template',
                    template: 'edit'
                }
            ]
        };
    },
    async mounted() {
        this.deptData = await this.getDeptTreeList();
        console.log(this.deptData);
    },
    computed: {
        propList() {
            return Object.keys(this.props).map(item => ({
                name: item
            }));
        }
    },
    watch: {},
    methods: {
        ...mapActions('system', ['getDeptTreeList']),
        changeStates(row) {
            const { deptId, state } = row;
            updateDeptStatus({ deptId, state }).then(
                res => {
                    if (res.data.success === true) {
                        let message;
                        if (row.state === 'Y') {
                            message = '启用成功';
                        } else {
                            message = '停用成功';
                        }
                        this.$Message.success(message);
                    }
                },
                err => {
                    this.initTableData();
                    console.log(err);
                }
            );
        },
        // 编辑/新建完成后重新获取数据
        async getData(success) {
            if (success) {
                // this.deptData = [];
                this.deptData = await this.getDeptTreeList();
                userMgrStore.getTreeData();
            }
        },
        addOrg(row) {
            this.$refs['edit-modal'].show({ parentDeptId: row && row.deptId });
        },
        editOrg(row) {
            this.$refs['edit-modal'].show({ deptId: row.deptId });
        },
        queryForm(name) {
            this.initTableData();
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    },
    created() {}
};
</script>

<style>
.ivu-switch-disabled {
    background: #f56a00;
    border-color: #f56a00;
}
.ivu-switch-disabled:after {
    background: #fff;
}
.zk-table__cell-inner i.ivu-icon {
    margin: 0 5px;
    cursor: pointer;
}
</style>
