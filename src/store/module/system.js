import { dictTypes, dictMap } from '@/constants';
import { getDicts } from '@/api/dicts';
import { getDeptsList } from '@/api/depts';
import { recurToTreeData, parseArrayToTreeData } from '@/libs/tools';
export default {
    namespaced: true,
    state: {
        [dictMap.roleType]: [] // 角色类型
    },
    mutations: {
        setDicts(state, { type, dicts }) {
            state[type] = dicts;
        }
    },
    actions: {
        async getDicts({ commit, state }) {
            const { data } = await getDicts(dictTypes);
            if (data.success) {
                const { data: dictData } = data;
                dictData.forEach(item => {
                    commit('setDicts', { type: item.type, dicts: item.sysDicts });
                });
            }
        },
        async getDeptTreeList({ commit, state }, limit) {
            const { data } = await getDeptsList();
            if (data.success) {
                const res = recurToTreeData(data.data, 0, limit);
                console.log(parseArrayToTreeData(data.data, 0));
                return res;
            }
        }
    }
};
