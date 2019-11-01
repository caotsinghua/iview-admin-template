export const dictTypes = ['role_type'];
// 把dictTypes映射成对象
function getDictMap() {
    const dictMap = {};
    dictTypes.forEach(key => {
        dictMap[key] = key;
    });
    return dictMap;
}
export const dictMap = getDictMap();
