import store from '../store';
export default {
    install(Vue, options) {
        // ！！全局混入！！
        Vue.mixin({
            methods: {
                privTypeFormatter(_, __, value) {
                    const map = {
                        C: '目录',
                        M: '菜单',
                        A: '操作'
                    };
                    return map[value];
                },
                filterPrivType(value) {
                    const map = {
                        C: {
                            text: '目录',
                            color: 'default'
                        },
                        M: {
                            text: '菜单',
                            color: 'primary'
                        },
                        A: {
                            text: '操作',
                            color: 'success'
                        }
                    };
                    return map[value] || {};
                },
                // 检查单个按钮权限
                hasPermission(needCode) {
                    const userAccess = store.state.user.operatePrivsMap[needCode];
                    return !!userAccess;
                }
            }
        });
    }
};
