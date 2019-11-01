import store from '../store';
import dayjs from 'dayjs';
function formatNumber(value) {
    if (!value) return '0.00';
    value = value.toString();

    /* 原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1 */
    var intPart = Math.floor(Number(value)); // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断

    var floatPart = '.00'; // 预定义小数部分
    var value2Array = value.split('.');

    //= 2表示数据有小数位
    if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分

        if (floatPart.length === 1) {
            // 补0,实际上用不着
            return intPartFormat + '.' + floatPart + '0';
        } else {
            return intPartFormat + '.' + floatPart;
        }
    } else {
        return intPartFormat;
    }
}
export default {
    install(Vue, options) {
        // ！！全局混入！！
        Vue.mixin({
            filters: {
                NumFormat: formatNumber
            },
            methods: {
                formatNumber: function(row, col, cellValue, index) {
                    return formatNumber(cellValue);
                },
                statusFormatter(row, col, value) {
                    if (value === '0') return '在职';
                    if (value === '1') return '离职';
                },
                dateFormatter(_, __, value) {
                    return value ? dayjs(value).format('YYYY-MM-DD') : value;
                },
                filterDate(value) {
                    return value ? dayjs(value).format('YYYY-MM-DD') : value;
                },
                filterDateHour(value) {
                    return value ? dayjs(value).format('YYYY-MM-DD HH时') : value;
                },
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
                    return map[value];
                },
                // 检查单个按钮权限
                hasPermission(needCode) {
                    const userAccess = store.state.user.operatePrivsMap[needCode];
                    return !!userAccess;
                },
                handleTrimInput(e, obj, key) {
                    if (!obj) {
                        this[key] = e.target.value && e.target.value.trim();
                    } else {
                        obj[key] = e.target.value && e.target.value.trim();
                    }
                }
            }
        });
    }
};
