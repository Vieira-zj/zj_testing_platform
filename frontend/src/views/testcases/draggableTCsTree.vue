<template>
  <div>
    <test-cases-template>
      <div slot="testcasesTree">
        <draggable-tree
          class="tree"
          :data="treedata"
          :draggable="true"
          cross-tree="cross-tree"
        >
          <div slot-scope="{ data, store }">
            <template v-if="!data.isDragPlaceHolder">
              <b
                v-if="data.children && data.children.length"
                @click="store.toggleOpen(data)"
              >
                {{ data.open ? '-' : '+' }}&nbsp;
              </b>
              <span>
                {{ data.text }}
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
import { DraggableTree } from 'vue-draggable-nested-tree'
import TestCaseForm from '@/components/TestCaseForm'

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
  name: 'DraggableTestCases',
  components: {
    TestCasesTemplate: testCasesTemplate,
    DraggableTree,
    TestCaseForm,
  },
  data() {
    return {
      treedata: treeData,
      tcName: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.test-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
}
.test-container {
  height: auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.test-aside {
  border-right: 1px solid #eee;
  background-color: rgba(144, 147, 153, 0.06);
}

.he-tree {
  border: 1px solid #ccc;
  padding: 20px;
}
.tree-node-inner {
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
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
.tree {
  .tree-node-inner {
    border: none;
    padding: 0px;
  }
  .tree-node-inner-back:hover {
    background: #ddd;
  }
}
</style>
