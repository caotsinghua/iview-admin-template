import { getPrivs } from '@/api/privs';
import { parsePrivsToTreeData } from '@/libs/tools';
export default {
    state: {
        privsData: [],
        privsTreeData: [],
        privsLoading: false
    },
    async getPrivsData() {
        this.state.privsLoading = true;
        try {
            const { data } = await getPrivs();
            if (data.success && data.data) {
                this.state.privsData = data.data;
                this.state.privsTreeData = parsePrivsToTreeData(data.data, 0);
            }
        } finally {
            this.state.privsLoading = false;
        }
    }
};
