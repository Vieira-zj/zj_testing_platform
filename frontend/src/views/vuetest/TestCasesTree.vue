<template>
  <div>
    <test-cases-template>
      <div slot="toolsBar">
        <el-tooltip content="You can double click on an item to turn it into a folder."
                    placement="top">
          <i class="el-icon-help op-icon"></i>
        </el-tooltip>
        <el-tooltip content="Expand All"
                    placement="top">
          <i class="el-icon-s-unfold op-icon"
             @click="onUnfoldAll"></i>
        </el-tooltip>
        <el-tooltip content="Collapse All"
                    placement="top">
          <i class="el-icon-s-fold op-icon"
             @click="onFoldAll"></i>
        </el-tooltip>
      </div>

      <div slot="testcasesTree">
        <tree-item class="item"
                   :item="treeData"
                   @focus-item="onFocusItem"
                   @make-folder="onMakeFolder"
                   @add-item="onAddItem"
                   @remove-item="onRemoveItem"
                   style="padding-left: 5px"></tree-item>
      </div>

      <div slot="testcaseForm">
        <test-case-form :tcName="tcName"
                        @tc-name-change="onTcNameChange"></test-case-form>
      </div>
    </test-cases-template>
  </div>
</template>

<script>
import TreeItem from '@/components/TreeItem'
import TestCaseForm from '@/components/TestCaseForm'
import TestCasesTemplate from './TestCasesTemplate'

let mockTreeData = {
  name: 'My Root',
  children: [
    { name: 'hello1' },
    { name: 'wat1' },
    {
      name: 'child 1-1',
      children: [
        {
          name: 'child 2-1',
          children: [{ name: 'hello2' }, { name: 'wat2' }],
        },
        { name: 'hello3' },
        { name: 'wat3' },
        {
          name: 'child 2-2',
          children: [{ name: 'hello4' }, { name: 'wat4' }],
        },
      ],
    },
  ],
}

// init global tree data with ui status
let initTreeData = function () {
  let setTreeDataStatus = function (root) {
    root.open = false
    root.select = false
    if (!root.children || root.children.length === 0) {
      return false
    }

    for (let i = 0; i < root.children.length; i++) {
      setTreeDataStatus(root.children[i])
    }
  }

  setTreeDataStatus(mockTreeData)
  // root is default selected and opened
  mockTreeData.select = true
  mockTreeData.open = true
}

initTreeData()

export default {
  name: 'TestCasesTree',
  components: {
    TestCasesTemplate,
    TreeItem,
    TestCaseForm,
  },
  data() {
    return {
      staffId: 0,
      treeData: mockTreeData,
      selectedItem: mockTreeData,
      tcName: '',
    }
  },
  methods: {
    onFocusItem(item) {
      this.selectedItem.select = false
      item.select = true
      this.selectedItem = item

      if (item.children && item.children.length > 0) {
        // TODO: 目录处理
        this.tcName = ''
      } else {
        this.tcName = item.name
      }
    },
    onMakeFolder(item) {
      this.$set(item, 'children', [])
      this.addItem(item)
    },
    onAddItem(item) {
      this.staffId++
      let name = 'new stuff' + this.staffId
      for (let child of item.children) {
        if (child.name == name) {
          this.$notifyMessage(`Item "${name}" already exist!`)
          return
        }
      }
      item.children.push({
        name: name,
      })
      item.open = true
    },
    onRemoveItem(item) {
      // 问题：删除一个元素后，会导致列表后面的元素重新加载（mount），item状态被重置。
      // 解决：将item状态保存在全局变量 treedata 中。
      this.removeItemFromTree(this.treeData, item)
      if (this.tcName === item.name) {
        this.tcName = ''
      }
    },
    removeItemFromTree(root, item) {
      if (!root.children || root.children.length === 0) {
        return false
      }
      // 问题：如果存在同名的item, 使用 name 做为删除条件会导致误删。
      // 解决：使用 id
      for (let i = 0; i < root.children.length; i++) {
        let child = root.children[i]
        if (child.name === item.name) {
          root.children.splice(i, 1)
          return true
        }
        if (this.removeItemFromTree(child, item)) {
          return true
        }
      }
    },
    onFoldAll() {
      let fold = function (item) {
        item.open = false
      }
      this.iterateTreeItem(this.treeData, fold)
    },
    onUnfoldAll() {
      let unfold = function (item) {
        item.open = true
      }
      this.iterateTreeItem(this.treeData, unfold)
    },
    iterateTreeItem(root, handler) {
      if (!root.children || root.children.length === 0) {
        return false
      }
      handler(root)
      for (let i = 0; i < root.children.length; i++) {
        this.iterateTreeItem(root.children[i], handler)
      }
    },
    onTcNameChange(newName) {
      this.selectedItem.name = newName
    },
  },
}
</script>

<style lang="scss" scoped>
.op-icon {
  margin: 5px;
}
</style>
