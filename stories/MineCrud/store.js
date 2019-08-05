import { action } from '@storybook/addon-actions';
export const types = {
    '1': '奇幻玄幻',
    '2': '幻想修仙',
    '3': '世界名著'
};
export default {
    state: {
        data: [
            {
                id: 1,
                title: '龙族',
                type: '1',
                author: '江南',
                publishTime: '2015-10-1',
                avatar: 'https://cn.vuejs.org/images/logo.png'
            },
            {
                id: 2,
                title: '悟空传',
                type: '2',
                author: '今何在',
                publishTime: '2011-10-1',
                avatar: 'https://cn.vuejs.org/images/logo.png'
            },
            {
                id: 3,
                title: '西游记',
                type: '3',
                author: '吴承恩',
                publishTime: '2010-10-1',
                avatar: 'https://cn.vuejs.org/images/logo.png'
            }
        ],
        page: 1,
        pageSize: 3,
        total: 20
    },
    actions: {
        createData(data) {
            action('createData')(data);
        },
        deleteRow(row) {
            action('deleteRow')(row);
        },
        updateRow(row) {
            action('updateRow')(row);
        },
        getData(params) {
            action('getData')({ params });
        },
        batchAction(data) {
            // 批量操作
            action('batchAction')(data);
        }
    }
};
