<template>
  <!-- 左侧导航栏 -->
  <nav-left>
    <div slot="menuItem">
      <el-menu-item index="/test/testCasesTree">
        <i class="el-icon-menu"></i>
        <span slot="title">TestCasesTree</span>
      </el-menu-item>
    </div>
    <div slot="menuItem" v-if="isTestCasesHeTree">
      <el-menu-item index="/test/testCasesHeTree">
        <i class="el-icon-s-grid"></i>
        <span slot="title">TCsHeTree</span>
      </el-menu-item>
    </div>
    <div slot="menuItem" v-if="isTestCasesDraggableTree">
      <el-menu-item index="/test/testCasesDraggableTree">
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
      isTestCasesHeTree: false,
      isTestCasesDraggableTree: true,
    }
  },
}
</script>
