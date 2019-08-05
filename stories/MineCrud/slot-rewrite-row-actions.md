### slot:append-row-actions

> 覆盖行内操作

<!-- STORY -->

代码:

```javascript
<template>
    <mine-crud
        :data="sharedState.data"
        :columns="columns"
        :formColumns="formColumns"
        :formData="formData"
        :rules="rules"
        :onUpdateForm="handleUpdateForm"
        :onCreateForm="handleCreateForm"
        :onDeleteRow="handleDeleteRow"
        :onBatchDelete="handleBatchDelete"
        border
        stripe
    >
        <template slot="rewrite-row-actions" slot-scope="{row}">
            <Dropdown>
                <Button>
                    更多操作
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>操作1</DropdownItem>
                    <DropdownItem>操作2</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </template>
    </mine-crud>
</template>
```

