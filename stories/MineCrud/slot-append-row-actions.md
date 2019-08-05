### slot:append-row-actions
> 添加行内操作
<!-- STORY -->

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
    >
        <template slot="append-row-actions" slot-scope="{ row }">
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

