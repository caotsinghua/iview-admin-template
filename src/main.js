// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import { Table, TableColumn, Loading } from 'element-ui';
import { directive as clickOutside } from 'v-click-outside-x';
import installPlugin from '@/plugin';
import config from '@/config';
import importDirective from '@/directive';
import { initAppByStatus, disableLog, logBuildInfo } from '@/libs/common-utils';
import mixin from './mixin';
import store from '@/store';
import Treeselect from '@riophae/vue-treeselect';
import ZkTable from 'vue-table-with-tree-grid';
import './index.less';
import '@/assets/icons/iconfont.css';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock');

Vue.use(ZkTable);
Vue.use(iView);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.component('treeselect', Treeselect);
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
/**
 * 注册指令
 */
importDirective(Vue);
Vue.directive('clickOutside', clickOutside);
/**
 * 混入
 */
Vue.use(mixin)
store.dispatch('getEnv');
initAppByStatus();

/**
 * 输出编译信息
 */
logBuildInfo();
disableLog();
