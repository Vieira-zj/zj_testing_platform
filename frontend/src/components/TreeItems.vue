<template>
  <!-- refer: https://cn.vuejs.org/v2/examples/tree-view.html -->
  <div>
    <div :class="{bold: isFolder}"
         @click="toggle(item)"
         @dblclick="makeFolder">
      <span v-if="isFolder">
        <i v-if="isOpen"
           class="el-icon-folder-opened"></i>
        <i v-else
           class="el-icon-folder"></i>
      </span>
      <span v-else>
        <i class="el-icon-document"></i>
      </span>
      {{ item.name }}
      <span v-if="isFolder"
            @click.stop="">
        <i @click="$emit('add-item', item)"
           class="el-icon-circle-plus"></i>
      </span>
    </div>

    <!-- children -->
    <div v-show="isOpen"
         v-if="isFolder">
      <tree-items class="item"
                  v-for="(child, index) in item.children"
                  :key="index"
                  :item="child"
                  @make-folder="$emit('make-folder', $event)"
                  @add-item="$emit('add-item', $event)"></tree-items>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeItems',
  props: {
    item: Object,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length
    },
  },
  methods: {
    toggle: function (item) {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      } else {
        console.log('click on item:', item.name)
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  margin: 5px 0 5px 15px;
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
</style>