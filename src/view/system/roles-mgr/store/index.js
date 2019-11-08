import { getRoles, getRoleUsers, getRolePrivs } from '@/api/roles';
import { parsePrivsToTreeData, parsePrivsToTreeDataWithChecked } from '@/libs/tools';
import { getPrivs } from '@/api/privs';
import { pushDataIndex } from '@/libs/util';

export default {
    state: {
        roles: [],
        rolePage: 1,
        rolePageSize: 20,
        roleTotal: 0,
        selectRoleId: '',
        roleLoading: false,
        // ====users
        users: [],
        userPage: 1,
        userPageSize: 20,
        userTotal: 0,
        userLoading: false,
        // ===== privs
        privs: [],
        privLoading: false,
        allPrivs: [],
        allPrivsTreeData: [],
        selectRole: null
    },
    async getRoles(query = {}) {
        const page = query.page || this.state.rolePage;
        const pageSize = query.pageSize || this.state.rolePageSize;
        this.state.rolePage = page;
        this.state.rolePageSize = pageSize;
        try {
            this.state.roleLoading = true;
            const { data } = await getRoles({ currPage: page, pageSize });
            if (data.success && data.data) {
                this.state.roles = data.data.list.map(item => ({ ...item, disabled: false }));
                this.state.roleTotal = data.data.totalCount;
            }
        } finally {
            this.state.roleLoading = false;
        }
    },
    async toggle(row, setCurrentRow, vm) {
        if (this.state.selectRoleId !== row.roleId) {
            this.clear();
            this.state.selectRoleId = row.roleId;
            this.state.selectRole = row;
            setCurrentRow(row);
            // debouncedGetPrivs.call(this);
            this.getUsers();
            try {
                this.disableOtherRows(row); // 其他行不可选
                await this.getPrivsData();
            } catch (e) {
                throw e;
            } finally {
                this.disableOtherRows(row, true);
            }
        }
    },
    disableOtherRows(row, cancel = false) {
        this.state.roles.forEach(item => {
            if (cancel) {
                item.disabled = false;
            } else {
                if (item.roleId !== row.roleId) {
                    item.disabled = true;
                }
            }
        });
    },
    clear() {
        Object.assign(this.state, {
            users: [],
            userPage: 1,
            userPageSize: 20,
            userTotal: 0,
            userLoading: false,
            // ===== privs
            privs: [],
            privLoading: false,
            allPrivs: [],
            allPrivsTreeData: [],
            selectRole: null
        });
    },
    async getUsers(query = {}) {
        if (!this.state.selectRoleId) return;
        const page = query.page || this.state.userPage;
        const pageSize = query.pageSize || this.state.userPageSize;
        this.state.userPage = page;
        this.state.userPageSize = pageSize;
        try {
            this.state.userLoading = true;
            const { data } = await getRoleUsers({ roleId: this.state.selectRoleId, currPage: page, pageSize });
            if (data.success && data.data) {
                this.state.users = pushDataIndex(data.data.list, page, pageSize);
                this.state.userTotal = data.data.totalCount;
            }
        } finally {
            this.state.userLoading = false;
        }
    },
    async getPrivs() {
        if (!this.state.selectRoleId) return;
        try {
            this.state.privLoading = true;
            const { data } = await getRolePrivs(this.state.selectRoleId);
            if (data.success && data.data) {
                this.state.privs = data.data;
                this.state.privsTreeData = parsePrivsToTreeData(data.data, 0);
            }
        } finally {
            this.state.privLoading = false;
        }
    },
    async getPrivsData() {
        if (!this.state.selectRoleId) return;
        try {
            this.state.privLoading = true;
            const { data } = await getRolePrivs(this.state.selectRoleId);
            const { data: allPrivsData } = await getPrivs();
            if (data.success && data.data && allPrivsData.success && allPrivsData.data) {
                this.state.privs = data.data;
                this.state.allPrivs = allPrivsData.data;
                const allPrivsTreeData = parsePrivsToTreeDataWithChecked(allPrivsData.data, data.data, 0);
                const adminRouteIndex = allPrivsTreeData.findIndex(item => item.privCode === 'system');
                this.state.allPrivsTreeData = allPrivsTreeData.filter((_, index) => index !== adminRouteIndex); // 取消综合管理的权限分配
            }
        } finally {
            this.state.privLoading = false;
        }
    }
};
