<template>
  <!-- refer: https://cn.vuejs.org/v2/examples/tree-view.html -->
  <div>
    <div id="item"
         :class="{ item: true, bold: isFolder, select: isSelect }"
         @click="toggle"
         @dblclick="makeFolder"
         @mouseenter="enter"
         @mouseleave="leave">
      <span v-if="isFolder">
        <i v-show="isOpen"
           class="el-icon-folder-opened"></i>
        <i v-show="!isOpen"
           class="el-icon-folder"></i>
      </span>
      <span v-else>
        <i class="el-icon-document"></i>
      </span>
      {{ item.name }}
      <span v-if="isFolder"
            @click.stop=""
            @dblclick.stop="">
        <i class="el-icon-circle-plus-outline"
           v-show="isHover"
           @click="$emit('add-item', item)"></i>
      </span>
      <span v-else
            @click.stop=""
            @dblclick.stop="">
        <i class="el-icon-remove-outline"
           v-show="isHover"
           @click="removeItem"></i>
      </span>
    </div>

    <!-- children -->
    <div v-show="isOpen"
         v-if="isFolder">
      <!-- 事件通过 tree-item 向上传递 -->
      <tree-item class="treeitem"
                 v-for="(child, index) in item.children"
                 :key="index"
                 :item="child"
                 @focus-item="$emit('focus-item', $event)"
                 @make-folder="$emit('make-folder', $event)"
                 @add-item="$emit('add-item', $event)"
                 @remove-item="$emit('remove-item', $event)"></tree-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: Object,
  },
  data() {
    return {
      isHover: false,
    }
  },
  computed: {
    isSelect() {
      return this.item.select
    },
    isFolder() {
      return this.item.children && this.item.children.length
    },
    isOpen() {
      return this.isFolder && this.item.open
    },
  },
  methods: {
    toggle() {
      this.$emit('focus-item', this.item)
      if (this.isFolder) {
        this.item.open = !this.item.open
      }
    },
    makeFolder() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.item.open = true
      }
    },
    enter() {
      this.isHover = true
    },
    leave() {
      this.isHover = false
    },
    removeItem() {
      this.$emit('remove-item', this.item)
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  margin: 7px 0 7px 0;
  cursor: pointer;
}
.treeitem {
  margin: 7px 0 7px 10px;
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
.select,
#item:hover {
  background-color: #81bdf5;
}
</style>
