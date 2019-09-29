import Main from '@/components/main';
const appRoutes = [
    {
        path: '/todos',
        name: 'todos',
        redirect: '/todos/list',
        meta: {
            title: 'todos',
            icon: 'md-albums',
            showAlways: true
        },
        component: Main,
        children: [
            {
                path: '/todos/list',
                name: 'todos-list',
                meta: {
                    title: 'todos',
                    icon: 'md-albums'
                },
                component: () => import('@/view/todos/index.vue')
            }
        ]
    }
];

export default appRoutes;
