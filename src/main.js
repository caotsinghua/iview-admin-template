// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import config from '@/config';
import importDirective from '@/directive';
import { directive as clickOutside } from 'v-click-outside-x';
import installPlugin from '@/plugin';
import { initAppByStatus, disableLog, logBuildInfo } from './libs/common-utils';
import store from './store';
import modal from '@/components/modal';
import './index.less';
import '@/assets/icons/iconfont.css';

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock');

Vue.use(iView);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.prototype.$modal = modal;
/**
 * 注册指令
 */
importDirective(Vue);
Vue.directive('clickOutside', clickOutside);

store.dispatch('getEnv');
initAppByStatus();

/**
 * 输出编译信息
 */
logBuildInfo();
disableLog();
