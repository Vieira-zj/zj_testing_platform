<template>
  <!-- 左侧导航栏 -->
  <nav-left>
    <div slot="menuItem">
      <el-menu-item index="/vuetest/testcasesTree">
        <i class="el-icon-menu"></i>
        <span slot="title">TestCasesTree</span>
      </el-menu-item>
    </div>
    <div slot="menuItem"
         v-if="isTCsVueHeTree">
      <el-menu-item index="/vuetest/tcsVueHeTree">
        <i class="el-icon-s-grid"></i>
        <span slot="title">TCsVueHeTree</span>
      </el-menu-item>
    </div>
    <div slot="menuItem"
         v-if="isTCsDraggableTree">
      <el-menu-item index="/vuetest/tcsDraggableTree">
        <i class="el-icon-s-grid"></i>
        <span slot="title">TCsDraggableTree</span>
      </el-menu-item>
    </div>
  </nav-left>
</template>

<script>
import NavLeft from '@/components/NavLeft'

export default {
  components: {
    NavLeft,
  },
  data() {
    return {
      isTCsVueHeTree: false,
      isTCsDraggableTree: true,
    }
  },
}
</script>
