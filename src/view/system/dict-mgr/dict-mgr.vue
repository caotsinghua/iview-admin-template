<template>
    <Card>
        <p slot="title"><Icon type="help-buoy"></Icon>字典管理</p>
        <Row>
            <Form :model="formItem" :label-width="80" ref="formItem">
                <Row :gutter="20">
                    <Col
                        :xs="{ span: 24 }"
                        :sm="{ span: 20 }"
                        :md="{ span: 8 }"
                        :lg="{ span: 8 }"
                        :style="{ maxWidth: '250px', zIndex: '99' }"
                    >
                        <FormItem label="字典名称" prop="dictName">
                            <Input v-model.trim="formItem.dictName" />
                        </FormItem>
                    </Col>
                    <Col
                        :xs="{ span: 24 }"
                        :sm="{ span: 20 }"
                        :md="{ span: 8 }"
                        :lg="{ span: 5 }"
                        :style="{ maxWidth: '250px', zIndex: '99' }"
                    >
                        <FormItem label="字典类型" prop="dictType">
                            <Input v-model.trim="formItem.dictType" />
                        </FormItem>
                    </Col>
                    <Col
                        :xs="{ span: 24 }"
                        :sm="{ span: 20 }"
                        :md="{ span: 8 }"
                        :lg="{ span: 5 }"
                        :style="{ maxWidth: '250px', zIndex: '99' }"
                    >
                        <FormItem label="状态" prop="dictStatus">
                            <Select v-model="formItem.dictStatus" placeholder="请选择">
                                <Option v-for="item in statusLists" :value="item.value" :key="item.value">{{
                                    item.label
                                }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :style="{ minWidth: '150px', float: 'left' }">
                        <Button type="primary" @click="queryForm()">查询</Button>
                        <Button ghost @click="handleReset()" style="margin-left: 8px">清空</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
        <div style="margin:10px 0 10px 0" class="btn-group">
            <Button type="primary" @click="addDict">新增</Button>
        </div>
        <Row class="searchable-table">
            <Table :columns="dictColumns" :data="dictData" :loading="isLoading"></Table>
            <Page
                :total="dataCount"
                :current="currPage"
                :page-size="pageSize"
                show-total
                show-sizer
                show-elevator
                @on-change="changepage"
                @on-page-size-change="handlePageSize"
                style="text-align:right;"
                :page-size-opts="[20, 50, 100]"
            ></Page>
        </Row>
        <Modal
            :title="`编辑字典数据(${editRow.dictLabel} - ${editRow.dictType})`"
            v-model="editDictModalVisible"
            @on-ok="queryTableData"
            @on-cancel="cancelEditData"
            width="680px"
        >
            <showDictData ref="show-dict-data" />
        </Modal>
        <EditDictTypeModal ref="edit-dict-type-modal" @refresh-data="queryTableData" />
    </Card>
</template>

<script>
import EditDictTypeModal from './edit-dict-type.vue';
import showDictData from './show-dict-data.vue';
import { getDictsParentList, updateDict, deleteDictsParent } from '@/api/dicts';
export default {
    name: 'dict-management',
    components: {
        EditDictTypeModal,
        showDictData
    },
    data() {
        return {
            isLoading: false,
            formItem: {
                dictName: '',
                dictType: '',
                dictStatus: 2
            },
            statusLists: [{ label: '全部', value: 2 }, { label: '正常', value: 0 }, { label: '停用', value: 1 }],
            dictColumns: [
                {
                    type: 'index2',
                    minWidth: 65,
                    title: '序号',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.index + (this.currPage - 1) * this.pageSize + 1);
                    }
                },
                {
                    key: 'dictLabel',
                    minWidth: 120,
                    title: '字典名称',
                    align: 'center'
                },
                {
                    key: 'dictType',
                    minWidth: 120,
                    title: '字典类型',
                    align: 'center'
                },
                {
                    key: 'updateTime',
                    minWidth: 120,
                    title: '更新时间',
                    align: 'center'
                },
                {
                    key: 'remark',
                    minWidth: 120,
                    title: '备注信息',
                    align: 'center'
                },
                {
                    key: 'dictStatus',
                    minWidth: 120,
                    title: '状态',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.dictStatus === '0') {
                            return h('div', '正常');
                        } else if (params.row.dictStatus === '1') {
                            return h('div', '停用');
                        }
                    }
                },
                {
                    key: 'operation',
                    minWidth: 210,
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.dictStatus === '1') {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        icon: 'md-create'
                                    },
                                    style: {
                                        color: '#f56a00',
                                        'font-size': '18px',
                                        padding: '6px 10px',
                                        marginRight: '3px'
                                    },
                                    attrs: {
                                        title: '编辑类型'
                                    },
                                    on: {
                                        click: () => {
                                            const rowData = {
                                                dictId: params.row.dictId,
                                                dictLabel: params.row.dictLabel,
                                                dictType: params.row.dictType,
                                                remark: params.row.remark
                                            };
                                            this.$refs['edit-dict-type-modal'].show(rowData);
                                            // let self = this;
                                            // self.$modal.create(
                                            //     {
                                            //         width: '600px',
                                            //         okText: '确定',
                                            //         title: '编辑字典类型',
                                            //         component: editDictType, // 引入子组件
                                            //         props: {
                                            //             dictId: params.row.dictId,
                                            //             dictLabel: params.row.dictLabel,
                                            //             dictType: params.row.dictType,
                                            //             remark: params.row.remark
                                            //         }
                                            //     },
                                            //     function(result) {
                                            //         console.log(self.currPage);
                                            //         self.queryTableData(self.currPage);
                                            //     }
                                            // );
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        // type: "primary",
                                        // size: "small",
                                        icon: 'ios-options'
                                    },
                                    style: {
                                        color: '#f56a00',
                                        'font-size': '18px',
                                        padding: '6px 10px',
                                        marginRight: '3px'
                                    },
                                    attrs: {
                                        title: '编辑数据'
                                    },
                                    on: {
                                        click: () => {
                                            Object.assign(this.editRow, params.row);
                                            this.editDictModalVisible = true;
                                            this.$refs['show-dict-data'].initData(params.row);
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        icon: 'md-eye-off'
                                    },
                                    attrs: {
                                        title: '启用'
                                    },
                                    style: {
                                        color: '#ccc',
                                        'font-size': '18px',
                                        padding: '6px 10px',
                                        marginRight: '3px'
                                    },
                                    on: {
                                        click: () => {
                                            this.disable(params.row.dictId, params.row.dictStatus);
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        icon: 'md-trash'
                                    },
                                    attrs: {
                                        title: '删除字典类型'
                                    },
                                    style: {
                                        color: '#ed3f14',
                                        'font-size': '18px',
                                        padding: '6px 10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.dictId);
                                        }
                                    }
                                })
                            ]);
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    icon: 'md-create'
                                },
                                style: {
                                    color: '#f56a00',
                                    'font-size': '18px',
                                    marginRight: '3px',
                                    padding: '6px 10px'
                                },
                                attrs: {
                                    title: '编辑类型'
                                },
                                on: {
                                    click: () => {
                                        const rowData = {
                                            dictId: params.row.dictId,
                                            dictLabel: params.row.dictLabel,
                                            dictType: params.row.dictType,
                                            remark: params.row.remark
                                        };
                                        this.$refs['edit-dict-type-modal'].show(rowData);
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    icon: 'ios-options'
                                },
                                style: {
                                    color: '#f56a00',
                                    'font-size': '18px',
                                    padding: '6px 10px',
                                    marginRight: '3px'
                                },
                                attrs: {
                                    title: '编辑数据'
                                },
                                on: {
                                    click: () => {
                                        Object.assign(this.editRow, params.row);
                                        this.editDictModalVisible = true;
                                        this.$refs['show-dict-data'].initData(params.row);
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    icon: 'md-eye'
                                },
                                attrs: {
                                    title: '停用'
                                },
                                style: {
                                    color: '#f56a00',
                                    'font-size': '18px',
                                    padding: '6px 10px',
                                    marginRight: '3px'
                                },
                                on: {
                                    click: () => {
                                        this.disable(params.row.dictId, params.row.dictStatus);
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    icon: 'md-trash'
                                },
                                attrs: {
                                    title: '删除字典类型'
                                },
                                style: {
                                    color: '#ed3f14',
                                    'font-size': '18px',
                                    padding: '6px 10px'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params.row.dictId);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            dictData: [],
            dataCount: 0,
            currPage: 1,
            // 每页显示多少条
            pageSize: 20,
            editDictModalVisible: false,
            editRow: {}
        };
    },
    mounted() {
        this.queryTableData();
    },
    methods: {
        queryTableData() {
            if (!this.currPage) {
                this.currPage = 1;
            }
            let params = {
                dictLabel: this.formItem.dictName,
                dictType: this.formItem.dictType,
                dictStatus: this.formItem.dictStatus == 2 ? '' : this.formItem.dictStatus,
                currPage: this.currPage,
                pageSize: this.pageSize
            };

            this.isLoading = true;
            getDictsParentList(params).then(
                res => {
                    this.isLoading = false;
                    if (res.data.success == true) {
                        this.dataCount = res.data.data.totalCount;
                        this.dictData = res.data.data.list;
                    }
                },
                err => {
                    this.isLoading = false;
                    console.log(err);
                }
            );
        },
        addDict() {
            this.$refs['edit-dict-type-modal'].show();
        },
        changepage(size) {
            if (size != this.currPage) {
                this.currPage = size;
                this.queryTableData();
            }
        },
        handlePageSize(value) {
            this.pageSize = value;
            this.currPage = 1;
            this.queryTableData();
        },
        queryForm() {
            this.currPage = 1;
            this.queryTableData();
        },
        handleReset() {
            this.formItem = {
                dictName: '',
                dictType: '',
                dictStatus: 2
            };
        },
        delete(id) {
            this.$Modal.confirm({
                title: '删除操作',
                content: '<p>确定删除该字典吗？</p>',
                onOk: () => {
                    this.isLoading = true;
                    deleteDictsParent(id).then(
                        res => {
                            this.isLoading = false;
                            if (res.data.success == true && res.data.code === '0') {
                                this.$Message.info('删除成功!');
                                this.queryTableData();
                            }
                        },
                        err => {
                            this.isLoading = false;
                            console.log(err);
                        }
                    );
                },
                onCancel: () => {
                    this.isLoading = false;
                }
            });
        },
        disable(id, status) {
            let params = {
                dictId: id,
                dictStatus: status === '0' ? '1' : '0'
            };

            updateDict(params).then(
                res => {
                    if (res.data.success == true) {
                        this.$Message.success('修改成功');
                        this.queryTableData();
                    }
                },
                err => {
                    console.log(err);
                }
            );
        },
        cancelEditData() {
            this.editRow = {};
            this.editDictModalVisible = false;
        }
    }
};
</script>
