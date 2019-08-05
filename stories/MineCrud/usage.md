## :smile: Usage
CRUD 组件允许你通过传入一些 props 和 events 直接生成增删改查逻辑，需要一些额外的功能也可以通过 slot 插入自己的内容。大部分 prop 与 iview 一致，只是放置的地方有区别。

```
import MineCrud from '@/components/mine-crud'
```
### crud-props

|      属性       |                             说明                             |   类型   | 默认值 |        是否必填         |
| :-------------: | :----------------------------------------------------------: | :------: | :----: | :---------------------: |
|      data       |                数据源，同 iview-table 的 data                |  Array   |   []   |           是            |
|     columns     | 表格列的配置描述，支持 iview-table 所有参数。[iview-table](https://www.iviewui.com/components/table) 具体区别见后文。 |  Array   |   []   |           是            |
|     loading     |                     table 是否处于加载中                     | boolean  | false  |           否            |
|   formColumns   |        决定表单渲染那些输入框和其类型等，具体见后文。        |  Array   |   []   |           是            |
|    formData     |                 当前正在添加或编辑的表单数据                 |  Object  |   {}   |           是            |
|      rules      | 当前表单的验证规则，同 iview.[查看](https://www.iviewui.com/components/form#BDYZ) |  Object  |   {}   |           否            |
|  hasRowDelBtn   |                     是否具有行内删除按钮                     | boolean  |  true  |           否            |
|  hasRowEditBtn  |                     是否具有行内编辑按钮                     | boolean  |  true  |           否            |
| hasBatchDelBtn  |                     是否具有批量删除按钮                     | boolean  |  true  |           否            |
|    hasAddBtn    |                     是否具有顶部添加按钮                     | boolean  |  true  |           否            |
| hasExportCsvBtn | 是否具有导出 csv 按钮 （调用 iview-table 的 exportCsv 方法） | boolean  |  true  |           否            |
|   pageConfig    | 分页配置，与 iview-page 的 prop 一致，不写则无分页.[查看](https://www.iviewui.com/components/page#API) |  Object  |   {}   |           否            |
|  onCreateForm   | 表单增加,当提交请求时的处理函数，传入参数当前表单信息 或在 formData 自行获取 | Function |        |    :hasAddBtn&&true     |
|  onUpdateForm   | 表单更新,当提交请求时的处理函数，传入参数当前表单信息 或在 formData 自行获取 | Function |        |  :hasRowEditBtn&&true   |
|   onDeleteRow   |    表单更新,当提交请求时的处理函数，传入参数当前 row 信息    | Function |        |   :hasRowDelBtn&&true   |
|  onBatchDelete  | 批量删除，无参数，具体批量删除的 id 等数据需自行设置 @on-selection-change 事件处理。 | Function |        | :hasBatchDelBtn && true |
| rowActionsWidth |                         行操作栏宽度                         |  Number  |  150   |           否            |
| rowActionsFixed | 同columns中[fixed属性](https://www.iviewui.com/components/table#GDL) |  String  |   无   |           否            |

### columns 参数与 iview 的一些区别和注意事项

-   当不需要批量删除而又有其他的批量操作需求时

    > :hasBatchDelBtn=false 并在 columns 中插入{type:'selection'}，就可以和原来一样进行批量操作。

-   当通过 expand 作为详情显示时，无需设置 render 参数，组件会通过传入的 expandedColumns 自行渲染。也可以设置 render 函数，此时按照 render 函数进行渲染。

    > 简单例子如下。
    >
    > 可以看到，expandedColumns 和 colNum 都是 iview 本身不具有的，后面对其具体参数进行解释。

    ```javascript
    columns: [
        {
            type: 'expand', // 无需设置render函数，会自动注入 | 设置render函数则按照render函数来渲染
            width: 60,
            // expandedColumns: ['name', 'age', 'type'], // 展开的key，和名称,不填名称默认和表格的title一致
            expandedColumns: [
                'name',
                { label: '年龄2', key: 'age' },
                { label: '类型', key: 'type', value: (key, row) => row[key] },
                'avatar'
            ],
            colNum: 3 // 每列几个字段
        }
    ];
    ```

**columns 中 type=expanded 时**

_expandedColumns_

-   expandedColumns 是一个数组，其元素可以为字符串，是该数据在 row 中的 key 值，如果在 columns 中定义了该 key 的 title，则在展开页中的 label 就是 title，如果没有对应 title 则就是该值。所以推荐当渲染表格中已有数据时直接使用 key。

-   也可以传入对象，属性如下所示

    | 属性  |                                                 说明                                                 |        类型        | 默认值 | 是否必填 |
    | :---: | :--------------------------------------------------------------------------------------------------: | :----------------: | :----: | :------: |
    | label |              label 名，不传则根据 columns 的 title 对应，columns 中没有则是 key 名称。               |       string       |        |    否    |
    |  key  | 对应值在 row 中的 key，不填 label 则 label 默认和表格的 title 一致。这是必填项，否则无法找到对应值。 |       string       |        |    是    |
    | value |              自定义对应值，如对日期进行格式化等。如果是函数，会传入 key 和 row 做参数。              | string 或 Function |        |    否    |

### formColumns

> 该参数用来决定增加/编辑表单有哪些输入值，注意 formData 中的值也要与 prop 保持一致。
>
> 该参数是一个数组类型，其中每个 item 为对象类型，具体参数如下：

|     属性     |                                                                                           说明                                                                                           |  类型  | 默认值 |       是否必填       |
| :----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----: | :----: | :------------------: |
|    label     |                                                                                         label 名                                                                                         | string |        |          是          |
|     prop     |                                                                                       表单的 prop                                                                                        | string |        |          是          |
|     type     |                                                                                表单的输入类型。可以是 无                                                                                 | select |  date  |       datetime       |
|    format    |                           如果定义了 type=date 或 datetime，format 同 iview 的 datepicker 的 format[查看](https://www.iviewui.com/components/date-picker#RQGS)                           | string |   ''   |          否          |
|    dicts     |                                                     如果定义了 type=select，则需要定义对应的字典。 如`[{label:'男性',value:'male'}]`                                                     | array  |   {}   | type===select&&true  |
| uploadConfig | 如果 type=upload 或 image，则 uploadConfig 是 iview-upload 的 prop 信息，由于 upload 没有自定义事件， 因此所有参数都可写在该配置中.[查看](https://www.iviewui.com/components/upload#API) | Object |   {}   | 其中 accept 是必传的 |

### 其他 props

iview-table 的所有 props 除了 data，columns，loading，都可以写在 mine-crud 组件中，会自动注入到 table 组件。

### events

组件中目前涉及到 Function 的参数都在 props 中，因此事件参数都是 iview 的 page 和 table 组件中的。

> 注：除了@on-change 和@on-page-size-change 会传入分页组件中，其余 events 都会注入到 Table 组件

### slot

|        属性         |          说明          | slot-scope |
| :-----------------: | :--------------------: | ---------- |
|    left-actions     | 插入在顶部的左侧操作栏 | 无         |
|    right-actions    | 插入在顶部的右侧操作栏 | 无         |
| rewrite-row-actions |  重写 table 的行操作   | {row}      |
| append-row-actions  | 插入到现有的行操作后面 | {row}      |
