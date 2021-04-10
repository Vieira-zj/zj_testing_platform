<template>
  <!-- 左侧导航栏 -->
  <nav-left>
    <div slot="menuItem">
      <el-menu-item index="/console/userManagement">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </div>
    <div slot="menuItem">
      <el-menu-item index="/console/testcases">
        <i class="el-icon-suitcase"></i>
        <span slot="title">TestCases</span>
      </el-menu-item>
    </div>
    <div slot="menuItem">
      <el-menu-item index="/console/draggableTestcasesTree">
        <i class="el-icon-suitcase"></i>
        <span slot="title">DraggableTCsTree</span>
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
}
</script>
