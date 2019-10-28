import Main from '@/components/main';
const systemRoutes = [
    {
        path: '/system',
        name: 'system',
        component: Main,
        meta: {
            title: '综合管理',
            icon: 'md-cog',
            showAlways: true
        },
        children: [
            {
                path: 'users-mgr',
                meta: {
                    title: '用户管理',
                    icon: 'ios-people'
                },
                name: 'users-mgr',
                component: () => import('@/view/system/users-mgr/users-mgr.vue')
            },
            {
                path: 'roles-mgr',
                meta: {
                    title: '角色管理',
                    icon: 'ios-person'
                },
                name: 'roles-mgr',
                component: () => import('@/view/system/roles-mgr/roles-mgr.vue')
            },
            {
                path: 'privs-mgr',
                meta: {
                    title: '权限管理',
                    icon: 'md-lock'
                },
                name: 'privs-mgr',
                component: () => import('@/view/system/privs-mgr/privs-mgr.vue')
            }
        ]
    }
];
export default systemRoutes;
