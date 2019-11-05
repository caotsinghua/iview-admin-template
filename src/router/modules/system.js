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
                path: 'dict-mgr',
                meta: {
                    title: '字典管理',
                    icon: 'md-pricetags'
                },
                name: 'dict-mgr',
                component: () => import('@/view/system/dict-mgr/dict-mgr.vue')
            },
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
            },
            {
                path:'configs-mgr',
                name:'configs-mgr',
                meta:{
                    title:'系统配置管理',
                    icon:'md-cog'
                },
                component:()=>import('@/view/system/configs-mgr/index.vue')
            }
        ]
    }
];
export default systemRoutes;
