// import iView from 'iview';
import { parseArrayToTreeData } from '@/libs/tools';
import { getUsers, getDeptUsers } from '@/api/user';
import { getDeptsList } from '@/api/depts';
import { filterEmptyData, filterOptionAll, getKeysObject, pushDataIndex } from '@/libs/util';
export default {
    state: {
        queryForm: {
            keyword: '',
            status: 'all'
        },
        curSelect: null,
        data: [], // 部门普通用户
        treeData: [],
        treeMap: {},
        searchData: [], // 用来搜索部门树
        page: 1,
        pageSize: 20,
        total: 0,
        loading: false,
        topDeptMap: {} // 一级部门映射
    },
    async getData(query = {}) {
        const page = query.page || this.state.page;
        const pageSize = query.pageSize || this.state.pageSize;
        const queryForm = this.state.queryForm;
        const deptId = this.state.curSelect && this.state.curSelect.id;

        this.state.page = page;
        this.state.pageSize = pageSize;

        try {
            this.state.loading = true;
            const queryData = {
                currPage: page,
                pageSize,
                ...queryForm
            };
            let res;
            if (deptId) {
                queryData.deptId = deptId;
                if (queryData.status === 'all') {
                    queryData.status = '';
                }
                res = await getDeptUsers(
                    getKeysObject(queryData, ['currPage', 'pageSize', 'deptId', 'keyword', 'status'])
                );
            } else {
                res = await getUsers(filterEmptyData(filterOptionAll(queryData)));
            }
            const data = res.data;
            if (data.success && data.data) {
                this.state.data = pushDataIndex(data.data.list, page, pageSize);
                this.state.total = data.data.totalCount;
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.state.loading = false;
        }
    },
    clearData() {
        this.state.workFlowUsers = [];
    },

    async getTreeData() {
        const { data } = await getDeptsList();
        if (data.success && data.data) {
            const source = data.data;
            source.push({
                deptAbbr: '',
                deptAbbrStyle: '',
                deptId: 0,
                deptName: '全部',
                deptType: '',
                parentDeptId: -1,
                remark: '',
                treeSort: 0
            });
            // 默认加入父节点
            this.state.sourceData = source;
            this.state.treeData = parseArrayToTreeData(source, -1);
            this.state.searchData = [];
            this.state.treeMap = {};
            source.forEach(node => {
                this.state.treeMap[node.deptId] = {
                    ...node,
                    id: node.deptId,
                    label: node.deptName,
                    title: node.deptName
                };
                this.state.searchData.push({ ...node, id: node.deptId, label: node.deptName, title: node.deptName });
                if (node.parentDeptId === 0) {
                    // 一级部门
                    this.state.topDeptMap[node.deptId] = node;
                }
            });
        }
    },
    setCurSelect(node) {
        if (this.state.curSelect) {
            this.state.curSelect.selected = false;
        }
        this.state.curSelect = node;
        if (node) {
            this.state.curSelect.selected = true;
        }
    }
};
