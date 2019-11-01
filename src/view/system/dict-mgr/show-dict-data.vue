<template>
    <div>
        <div style="margin:10px 0 10px 0" class="btn-group">
            <Button type="primary" @click="addDictData">新增</Button>
        </div>
        <Row class="searchable-table">
            <Table :columns="dictColumns" :data="dictData" :loading="isLoading"></Table>
        </Row>
        <EditDictDataModal ref="edit-dict-data-modal" @refresh-data="queryTableData" />
    </div>
</template>
<script>
import EditDictDataModal from './edit-dict-data.vue';
import { deleteDict, updateDict, getDictsType } from '@/api/dicts';
export default {
    name: 'show-dict-data',
    components: {
        EditDictDataModal
    },
    data() {
        return {
            isLoading: false,
            statusLists: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }],
            dictColumns: [
                {
                    key: 'dictLabel',
                    minWidth: 120,
                    title: '字典标签',
                    align: 'center'
                },
                {
                    key: 'dictValue',
                    minWidth: 120,
                    title: '字典键值',
                    align: 'center'
                },
                {
                    key: 'dictOrder',
                    minWidth: 120,
                    title: '排序号',
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
                    align: 'center'
                },
                {
                    key: 'operation',
                    minWidth: 200,
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.dictStatus === '停用') {
                            return h('div', [
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
                                            const rowData = {
                                                parentDictId: this.parentDictId,
                                                dictType: this.dictType,
                                                dictId: params.row.dictId,
                                                dictLabel: params.row.dictLabel,
                                                dictValue: params.row.dictValue,
                                                dictOrder: params.row.dictOrder,
                                                remark: params.row.remark
                                            };
                                            this.$refs['edit-dict-data-modal'].show(rowData);
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
                                        // color: '#19be6b',
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
                                        title: '删除'
                                    },
                                    style: {
                                        'font-size': '18px',
                                        padding: '6px 10px',
                                        color: '#ed3f14'
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
                                        const rowData = {
                                            parentDictId: this.parentDictId,
                                            dictType: this.dictType,
                                            dictId: params.row.dictId,
                                            dictLabel: params.row.dictLabel,
                                            dictValue: params.row.dictValue,
                                            dictOrder: params.row.dictOrder,
                                            remark: params.row.remark
                                        };
                                        this.$refs['edit-dict-data-modal'].show(rowData);
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
                                    title: '删除'
                                },
                                style: {
                                    'font-size': '18px',
                                    padding: '6px 10px',
                                    color: '#ed3f14'
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
            dictAllData: [],
            dictType: '',
            parentDictId: ''
        };
    },
    // props: {
    //     dictType: String,
    //     parentDictId: Number
    // },

    // mounted() {
    //     if (this.dictType) {
    //         this.queryTableData();
    //     }
    // },

    methods: {
        initData(row) {
            console.log(row);
            if (row && row.dictType) {
                this.dictType = row.dictType;
                this.parentDictId = row.dictId;

                this.queryTableData();
            }
        },
        queryTableData() {
            this.isLoading = true;
            getDictsType(this.dictType).then(
                res => {
                    this.isLoading = false;
                    if (res.data.success == true) {
                        res.data.data.forEach(element => {
                            if (element.dictStatus === '0') {
                                element.dictStatus = '正常';
                            } else if (element.dictStatus === '1') {
                                element.dictStatus = '停用';
                            }
                        });
                        this.dictData = res.data.data;
                    }
                    console.log(res);
                },
                err => {
                    this.isLoading = false;
                    console.log(err);
                }
            );
        },
        addDictData() {
            const rowData = {
                parentDictId: this.parentDictId,
                dictType: this.dictType,
                dictOrder: 0
            };
            this.$refs['edit-dict-data-modal'].show(rowData);
        },
        changepage(size) {
            this.currPage = size;
            this.dictData = this.dictAllData.slice((this.currPage - 1) * this.pageSize, this.currPage * this.pageSize);
        },
        handlePageSize(value) {
            this.currPage = 1;
            this.dictData = this.dictAllData.slice(0, value);
        },
        delete(id) {
            this.$Modal.confirm({
                title: '删除操作',
                content: '<p>确定删除该字典项吗？</p>',
                onOk: () => {
                    this.isLoading = true;
                    deleteDict(id).then(
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
                parentDictId: this.parentDictId,
                dictId: id,
                dictStatus: status === '正常' ? '1' : '0'
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
        save() {
            this.$emit('submit', true);
        }
    }
};
</script>
