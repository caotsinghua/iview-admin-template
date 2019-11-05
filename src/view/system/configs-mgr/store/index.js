import { getConfigs } from '@/api/configs';
export default {
    state: {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        // queryInfo
        queryInfo: {
            configCode: ''
        }
    },
    // actions
    async getData(query = {}) {
        const page = query.page || this.state.page;
        const pageSize = query.pageSize || this.state.pageSize;
        this.state.page = page;
        this.state.pageSize = pageSize;
        try {
            this.state.loading = true;
            const queryData = {
                currPage: page,
                pageSize,
                ...this.state.queryInfo
            };
            const { data } = await getConfigs(queryData);
            if (data.success) {
                this.state.data = data.data.list;
                this.state.total = data.data.totalCount;
            }
        } catch (e) {
            throw e;
        } finally {
            this.state.loading = false;
        }
    },
    setQueryInfo(query) {
        this.state.queryInfo = query;
    },
    clear() {
        Object.assign(this.state, {
            data: [],
            page: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            // queryInfo
            queryInfo: {
                configCode: ''
            }
        });
    }
};
