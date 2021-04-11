<template>
  <div>
    <test-cases-template>
      <div slot="testcasesTree">
        <!-- he-tree refer: https://he-tree-vue.phphe.com/zh/guide.html -->
        <!-- Note: tree scss cannot be "scoped". -->
        <he-tree :value="treedata">
          <span slot-scope="{ node, path, tree }">
            <span v-if="node.children" @click="tree.toggleFold(node, path)">
              <i class="el-icon-folder" v-if="node.$folded"></i>
              <i class="el-icon-folder-opened" v-else></i>
              &nbsp;{{ node.text }}
            </span>
            <span v-else>
              <i class="el-icon-document"></i>
              &nbsp;{{ node.text }}
            </span>
          </span>
        </he-tree>
      </div>

      <div slot="testcaseForm">
        <test-case-form :tcName="tcName"></test-case-form>
      </div>
    </test-cases-template>
  </div>
</template>

<script>
import testCasesTemplate from './testCasesTemplate.vue'
import TestCaseForm from '@/components/TestCaseForm'
import 'he-tree-vue/dist/he-tree-vue.css'
import { Tree, Fold, Draggable } from 'he-tree-vue'

let treedata = [
  { text: 'node 1' },
  { text: 'node 2' },
  { text: 'node 3' },
  { text: 'node 4' },
  { text: 'node 4' },
  {
    text: 'node 5',
    children: [
      { text: 'node 1' },
      { text: 'node 2', children: [{ text: 'node 3' }, { text: 'node 4' }] },
      {
        text: 'node 2',
        children: [{ text: 'node 3' }, { text: 'node 4' }],
      },
      {
        text: 'node 2',
        children: [{ text: 'node 3' }, { text: 'node 4' }],
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
  name: 'TestCasesHeTree',
  components: {
    TestCasesTemplate: testCasesTemplate,
    HeTree: Tree.mixPlugins([Fold, Draggable]),
    TestCaseForm,
  },
  data() {
    return {
      treedata: treedata,
      tcName: '',
    }
  },
}
</script>

<style lang="scss">
.he-tree {
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
}
.tree-root {
  .tree-node {
    border: none;
    padding: 2px;
    cursor: pointer;
  }
  .tree-node-back:hover {
    background: #ddd;
  }
}
</style>
