<template>
  <div>
    <test-cases-template>
      <div slot="toolsBar">
        <el-tooltip content="Expand All"
                    placement="top">
          <i class="el-icon-s-unfold"
             @click="expandAll"
             style="margin: 5px"></i>
        </el-tooltip>
        <el-tooltip content="Collapse All"
                    placement="top">
          <i class="el-icon-s-fold"
             @click="collapseAll"
             style="margin: 5px"></i>
        </el-tooltip>
      </div>

      <div slot="testcasesTree">
        <!-- draggable-tree refer: https://github.com/phphe/vue-draggable-nested-tree -->
        <!-- Note: tree scss cannot be "scoped". -->
        <draggable-tree :data="treeData"
                        :draggable="true"
                        @drop="onDrop"
                        @nodeOpenChanged="onNodeOpenChanged">
          <!-- data is node, store is tree -->
          <div slot-scope="{ data, store }">
            <template v-if="!data.isDragPlaceHolder">
              <div @click="onClickNode(data, store)"
                   :class="{ 'custom-tree-node-active': data.active }">
                <span v-if="isTree(data)">
                  <i class="el-icon-folder-opened"
                     v-if="data.open"></i>
                  <i class="el-icon-folder"
                     v-else></i>
                  &nbsp;<b>{{ data.text }}</b>
                </span>
                <span v-else>
                  <i class="el-icon-document"></i>
                  &nbsp;{{ data.text }}
                </span>
              </div>
            </template>
          </div>
        </draggable-tree>
      </div>

      <div slot="testcaseForm">
        <test-case-form :tcName="tcName"></test-case-form>
      </div>
    </test-cases-template>
  </div>
</template>

<script>
import { pure } from '@/utils/common'
import TestCasesTemplate from './TestCasesTemplate.vue'
import TestCaseForm from '@/components/TestCaseForm'
import { DraggableTree } from 'vue-draggable-nested-tree'
import { breadthFirstSearch } from 'tree-helper'

let treeData = [
  { text: 'node 1' },
  { text: 'node 2' },
  { text: 'node 3 undraggable', draggable: false },
  { text: 'node 4' },
  { text: 'node 4 undroppable', droppable: false },
  {
    text: 'node 5',
    children: [
      { text: 'node 1' },
      { text: 'node 2', children: [{ text: 'node 3' }, { text: 'node 4' }] },
      {
        text: 'node 2 undroppable',
        droppable: false,
        children: [{ text: 'node 3' }, { text: 'node 4' }],
      },
      {
        text: 'node 2',
        children: [
          { text: 'node 3' },
          { text: 'node 4 undroppable', droppable: false },
        ],
      },
      { text: 'node 3' },
      { text: 'node 4' },
      { text: 'node 3' },
      { text: 'node 4' },
      { text: 'node 3' },
      { text: 'node 4' },
      { text: 'node 3' },
      { text: 'node 4' },
    ],
  },
]

export default {
  name: 'TestCasesDraggableTree',
  components: {
    TestCasesTemplate,
    TestCaseForm,
    DraggableTree,
  },
  data() {
    return {
      isDebug: false,
      treeData: treeData,
      tcName: '',
      lastActiveNode: null,
    }
  },
  methods: {
    onDrop(node, targetTree, oldTree) {
      if (!this.isDebug) {
        return
      }
      console.log('on drag drop')
      if (oldTree) {
        console.log('old tree:', oldTree)
      }
      console.log('new tree:', targetTree.getPureData())
      console.log('store:', node._vm.store.getPureData())

      let pureData = treeData.map((item) => {
        return pure(item, true)
      })
      console.log('tree data:', pureData)
    },
    onNodeOpenChanged(node) {
      console.log(`node [${node.text}] open=${node.open}`)
    },
    onClickNode(data, store) {
      this.tcName = data.text
      this.activeNode(data)
      if (this.isTree(data)) {
        store.toggleOpen(data)
      }
    },
    activeNode(node) {
      if (this.lastActiveNode) {
        this.lastActiveNode.active = false
      }
      node.active = true
      this.lastActiveNode = node
    },
    isTree(node) {
      return node.children && node.children.length > 0
    },
    expandAll() {
      breadthFirstSearch(this.treeData, (node) => {
        node.open = true
      })
    },
    collapseAll() {
      breadthFirstSearch(this.treeData, (node) => {
        node.open = false
      })
    },
  },
}
</script>

<style lang="scss">
.he-tree {
  padding: 8px 0 0 5px;
}
.tree {
  // .tree-node {}
  .tree-node-inner {
    border: none;
    padding: 0px;
    cursor: pointer;
  }
  .tree-node-inner-back:hover {
    background: #ddd;
  }
  // .draggable-placeholder {}
  .draggable-placeholder-inner {
    border: 1px dashed #0088f8;
    box-sizing: border-box;
    background: rgba(0, 136, 249, 0.09);
    color: #0088f9;
    text-align: center;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .custom-tree-node-active {
    background-color: #81bdf5;
  }
}
</style>
