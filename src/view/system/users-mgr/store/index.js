import { getUsers } from '@/api/user';
import { filterEmptyData, pushDataIndex } from '@/libs/util';
export default {
    state: {
        queryForm: {
            keyword: ''
        },
        data: [], // 部门普通用户
        page: 1,
        pageSize: 20,
        total: 0,
        loading: false
    },
    async getData(query = {}) {
        const page = query.page || this.state.page;
        const pageSize = query.pageSize || this.state.pageSize;
        const queryForm = this.state.queryForm;

        this.state.page = page;
        this.state.pageSize = pageSize;

        try {
            this.state.loading = true;
            this.clearData();
            const queryData = {
                currPage: page,
                pageSize,
                ...queryForm
            };
            let res = await getUsers(filterEmptyData(queryData));
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
        Object.assign(this.state, {
            data: [], // 部门普通用户
            total: 0
        });
    }
};
