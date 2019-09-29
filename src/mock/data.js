import Mock from 'mockjs';

export function getArticles() {
    return Mock.mock({
        success: true,
        // code: '10000',
        'data|15-40': [
            {
                id: '@increment',
                title: '@ctitle(5,15)',
                author: '@cname',
                publishTime: '@datetime',
                updateTime: '@datetime',
                readed: '@integer(10,10000)'
            }
        ]
    });
}

export function getEnv() {
    return {
        success: true,
        data: {
            env: 'dev'
        }
    };
}
