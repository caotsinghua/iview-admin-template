import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import store from '@/store';
import iView from 'iview';
// import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util';
import { canTurnTo, setTitle } from '@/libs/util';
import config from '@/config';

Vue.use(Router);

const { homeName } = config;
const LOGIN_PAGE_NAME = 'login';

const turnTo = (to, access, next) => {
    if (canTurnTo(to.name, access, routes)) next();
    // 有权限，可访问
    else next({ replace: true, name: 'error_401' }); // 无权限，重定向到401页面
};

function createRouter() {
    const router = new Router({
        routes,
        mode: 'history'
    });
    router.beforeEach((to, from, next) => {
        iView.LoadingBar.start();

        const { hasLogged } = store.state.user;
        if (!hasLogged && to.name !== LOGIN_PAGE_NAME) {
            // 未登录且要跳转的页面不是登录页
            next({
                name: LOGIN_PAGE_NAME, // 跳转到登录页
                query: {
                    redirectName: to.name
                }
            });
        } else if (!hasLogged && to.name === LOGIN_PAGE_NAME) {
            // 未登陆且要跳转的页面是登录页
            next(); // 跳转
        } else if (hasLogged && to.name === LOGIN_PAGE_NAME) {
            // 已登录且要跳转的页面是登录页
            next({
                name: homeName // 跳转到homeName页
            });
        } else {
            turnTo(to, store.state.user.access, next);
        }
    });

    router.afterEach(to => {
        setTitle(to, router.app);
        iView.LoadingBar.finish();
        window.scrollTo(0, 0);
    });
    return router;
}

export default createRouter;
