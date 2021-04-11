<template>
  <div>
    <test-cases-template>
      <div slot="testcasesTree">
        <!-- draggable-tree refer: https://github.com/phphe/vue-draggable-nested-tree -->
        <!-- Note: tree scss cannot be "scoped". -->
        <draggable-tree
          :data="treedata"
          :draggable="true"
          cross-tree="cross-tree"
        >
          <!-- data is node, store is tree -->
          <div slot-scope="{ data, store }">
            <template v-if="!data.isDragPlaceHolder">
              <span
                v-if="data.children && data.children.length"
                @click="store.toggleOpen(data)"
              >
                <i class="el-icon-folder-opened" v-if="data.open"></i>
                <i class="el-icon-folder" v-else></i>
                &nbsp;<b>{{ data.text }}</b>
              </span>
              <span v-else>
                <i class="el-icon-document"></i>
                &nbsp;{{ data.text }}
              </span>
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
import testCasesTemplate from './testCasesTemplate.vue'
import TestCaseForm from '@/components/TestCaseForm'
import { DraggableTree } from 'vue-draggable-nested-tree'

let treedata = [
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
    TestCasesTemplate: testCasesTemplate,
    TestCaseForm,
    DraggableTree,
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
}
</style>
